package com.ssafy.someauth.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
public class RefreshToken {

    @Id
    private String userId;
    private String tokenValue;

    public RefreshToken(String userId, String tokenValue) {
        this.userId = userId;
        this.tokenValue = tokenValue;
    }
}
