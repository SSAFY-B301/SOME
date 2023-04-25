package com.ssafy.someauth.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class UserDto {
    private String userId;
    private String userName;
    private String userEmail;
    private String userImg;

    @Builder
    public UserDto(String userId, String userName, String userEmail, String userImg) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userImg = userImg;
    }
}
