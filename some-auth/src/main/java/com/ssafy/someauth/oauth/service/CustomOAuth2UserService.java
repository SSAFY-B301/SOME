package com.ssafy.someauth.oauth.service;


import com.ssafy.someauth.entity.User;
import com.ssafy.someauth.oauth.entity.RoleType;
import com.ssafy.someauth.oauth.entity.UserPrincipal;
import com.ssafy.someauth.oauth.info.KakaoOAuth2UserInfo;
import com.ssafy.someauth.oauth.info.OAuth2UserInfo;
import com.ssafy.someauth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);
        try {
            return this.process(userRequest, user);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        OAuth2UserInfo userInfo = new KakaoOAuth2UserInfo(user.getAttributes());
        User savedUser = userRepository.findByUserId(userInfo.getId());
        log.info("Kakao AccessToken 나와라 => " + userRequest.getAccessToken().getTokenValue());

        if (savedUser != null) {
            updateUser(savedUser, userInfo);
        } else {
            savedUser = createUser(userInfo);
        }

        return UserPrincipal.create(savedUser, user.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo) {
        ZonedDateTime now = ZonedDateTime.now();
        User user = new User(
                userInfo.getId(),
                userInfo.getName(),
                userInfo.getEmail(),
                userInfo.getImageUrl(),
                RoleType.USER,
                LocalDateTime.now()
        );

        return userRepository.saveAndFlush(user);
    }

    private User updateUser(User user, OAuth2UserInfo userInfo) {
        if (userInfo.getName() != null && !user.getUserName().equals(userInfo.getName())) {
            user.setUserName(userInfo.getName());
        }

        if (userInfo.getImageUrl() != null && !user.getUserImg().equals(userInfo.getImageUrl())) {
            user.setUserImg(userInfo.getImageUrl());
        }

        return user;
    }
}
