package com.ssafy.someauth.controller;

import com.ssafy.someauth.config.properties.AppProperties;
import com.ssafy.someauth.dto.ResponseDto;
import com.ssafy.someauth.entity.RefreshToken;
import com.ssafy.someauth.oauth.entity.RoleType;
import com.ssafy.someauth.oauth.token.AuthToken;
import com.ssafy.someauth.oauth.token.AuthTokenProvider;
import com.ssafy.someauth.repository.RefreshTokenRepository;
import com.ssafy.someauth.service.UserService;
import com.ssafy.someauth.util.CookieUtil;
import com.ssafy.someauth.util.HeaderUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final AppProperties appProperties;
    private final AuthTokenProvider authTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserService userService;

    private final static long THREE_DAYS_MSEC = 259200000;
    private final static String REFRESH_TOKEN = "refresh_token";

    /* 유저 정보 조회 */
    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        // header의 accessToken으로 userId 추출
        String accessToken = HeaderUtil.getAccessToken(request);
        String userId = authTokenProvider.getUserId(accessToken);
        ResponseDto responseDto = userService.getUser(userId);

        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    /* refresh 토큰 갱신 */
    @GetMapping("/refresh")
    public ResponseDto refreshToken(HttpServletRequest request, HttpServletResponse response) {
        // access token 확인
        String accessToken = HeaderUtil.getAccessToken(request);
        AuthToken authToken = authTokenProvider.convertAuthToken(accessToken);
        ResponseDto responseDto = new ResponseDto();

        if (!authToken.validate()) {
            responseDto.setStatusCode(501);
            responseDto.setMessage("유효하지 않은 AccessToken입니다.");
            return responseDto;
        }

        // expired access token 인지 확인
        Claims claims = authToken.getExpiredTokenClaims();
        if (claims == null) {
            responseDto.setStatusCode(501);
            responseDto.setMessage("토큰이 아직 만료되지 않았습니다.");
            return responseDto;
        }

        String userId = claims.getSubject();
        RoleType roleType = RoleType.of(claims.get("role", String.class));

        // refresh token
        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN)
                .map(Cookie::getValue)
                .orElse((null));
        AuthToken authRefreshToken = authTokenProvider.convertAuthToken(refreshToken);

        if (authRefreshToken.validate()) {
            responseDto.setStatusCode(501);
            responseDto.setMessage("유효하지 않은 RefreshToken입니다.");
            return responseDto;
        }

        // userId refresh token으로 DB 확인
        RefreshToken userRefreshToken = refreshTokenRepository.findByUserIdAndRefreshTokenId(userId, refreshToken);
        if (userRefreshToken == null) {
            responseDto.setStatusCode(501);
            responseDto.setMessage("유효하지 않은 RefreshToken입니다.");
            return responseDto;
        }

        Date now = new Date();
        AuthToken newAccessToken = authTokenProvider.createAuthToken(
                userId,
                roleType.getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );
        long validTime = authRefreshToken.getTokenClaims().getExpiration().getTime() - now.getTime();

        // refresh 토큰 기간이 3일 이하로 남은 경우, refresh 토큰 갱신
        if (validTime <= THREE_DAYS_MSEC) {
            // refresh 토큰 설정
            long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

            authRefreshToken = authTokenProvider.createAuthToken(
                    appProperties.getAuth().getTokenSecret(),
                    new Date(now.getTime() + refreshTokenExpiry)
            );

            // DB에 refresh 토큰 업데이트
            userRefreshToken.setTokenValue(authRefreshToken.getToken());

            int cookieMaxAge = (int) refreshTokenExpiry / 60;
            CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
            CookieUtil.addCookie(response, REFRESH_TOKEN, authRefreshToken.getToken(), cookieMaxAge);
        }

        responseDto.setStatusCode(200);
        responseDto.setMessage("refreshToken 갱신");
        responseDto.setData(newAccessToken.getToken());

        return responseDto;
    }
}
