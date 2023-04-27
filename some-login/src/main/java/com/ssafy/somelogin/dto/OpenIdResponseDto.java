package com.ssafy.somelogin.dto;

import lombok.Data;

@Data
public class OpenIdResponseDto {
    private String sub;
    private String nickname;
    private String picture;
    private String email;
    private String email_verified;
}
