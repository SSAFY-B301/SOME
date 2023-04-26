package com.ssafy.someauth.oauth.info;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    private String id;

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super((Map<String, Object>) attributes.get("kakao_account"));
        this.id = attributes.get("id").toString();
    }

    @Override
    public String getId() {
        return this.id;
    }

    @Override
    public String getName() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("profile");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("nickname");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("profile");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("thumbnail_image_url");
    }
}
