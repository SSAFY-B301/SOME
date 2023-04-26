package com.ssafy.someauth.config.security;

import com.ssafy.someauth.config.properties.AppProperties;
import com.ssafy.someauth.config.properties.CorsProperties;
import com.ssafy.someauth.oauth.exception.RestAuthenticationEntryPoint;
import com.ssafy.someauth.oauth.filter.TokenAuthenticationFilter;
import com.ssafy.someauth.oauth.handler.OAuth2AuthenticationFailureHandler;
import com.ssafy.someauth.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.ssafy.someauth.oauth.handler.TokenAccessDeniedHandler;
import com.ssafy.someauth.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.ssafy.someauth.oauth.service.CustomOAuth2UserService;
import com.ssafy.someauth.oauth.token.AuthTokenProvider;
import com.ssafy.someauth.repository.RefreshTokenRepository;
import com.ssafy.someauth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserRepository userRepository;
    private final CorsProperties corsProperties;
    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final CustomOAuth2UserService oAuth2UserService;
    private final TokenAccessDeniedHandler tokenAccessDeniedHandler;
    private final RefreshTokenRepository refreshTokenRepository;

    /*
    * UserDetailsService 설정
    * */
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService)
//                .passwordEncoder(passwordEncoder());
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
            http
                    .csrf().disable() // csrf 미사용
                    .cors()
                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 사용하지 않음
                .and()
                    .httpBasic().disable()
                    .exceptionHandling()
                    .authenticationEntryPoint(new RestAuthenticationEntryPoint())
                    .accessDeniedHandler(tokenAccessDeniedHandler)
                .and()
                    .authorizeRequests()
                    .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                    .antMatchers("/**").permitAll()
//                    .antMatchers("/api/users/auth/**").permitAll()
//                    .antMatchers("/api/**").hasAnyAuthority(RoleType.USER.getCode()) // Security 허용 Url
//                    .antMatchers("/api/**/admin/**").hasAnyAuthority(RoleType.ADMIN.getCode())
                    .anyRequest().authenticated() // 그 외엔 모두 인증 필요
                .and()
                    .formLogin()
                    .loginPage("/api/users/auth/loginform").permitAll() // 로그인 폼 사용
                    .defaultSuccessUrl("/") // 로그인 성공 후 이동 페이지
                .and()
                    // 인가에 대한 요청 서비스
                    // "/oauth2/authorization"로 접근시 oauth 로그인 요청
                    .oauth2Login()
                    .authorizationEndpoint()
                    .baseUri("/oauth2/authorization") // 소셜 로그인 Url
                    .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository()) // 인증 요청을 쿠키에 저장하고 검색
                .and()
                    // callback 주소
                    .redirectionEndpoint()
                    .baseUri("/*/oauth2/code/*")  // 소셜 인증 후 Redirect Url
                .and()
                    .userInfoEndpoint()
                    .userService(oAuth2UserService) // 소셜의 회원 정보를 받아와 가공처리
                .and()
                    .successHandler(oAuth2AuthenticationSuccessHandler()) // 인증 성공 시 Handler
                    .failureHandler(oAuth2AuthenticationFailureHandler()); // 인증 실패 시 Handler
        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    /*
    * auth 매니저 설정
    * */
    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    /*
    * security 설정 시, 사용할 인코더 설정
    * */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
    * 토큰 필터 설정
    * */
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter(tokenProvider);
    }

    /*
    * 쿠키 기반 인가 Repository
    * 인가 응답을 연계 하고 검증할 때 사용.
    * */
    @Bean
    public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
        return new OAuth2AuthorizationRequestBasedOnCookieRepository();
    }

    /*
    * Oauth 인증 성공 핸들러
    * */
    @Bean
    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new OAuth2AuthenticationSuccessHandler(
                tokenProvider,
                appProperties,
                userRepository,
                refreshTokenRepository,
                oAuth2AuthorizationRequestBasedOnCookieRepository()
        );
    }

    /*
     * Oauth 인증 실패 핸들러
     * */
    @Bean
    public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
        return new OAuth2AuthenticationFailureHandler(oAuth2AuthorizationRequestBasedOnCookieRepository());
    }

    /*
    * Cors 설정
    * */
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
