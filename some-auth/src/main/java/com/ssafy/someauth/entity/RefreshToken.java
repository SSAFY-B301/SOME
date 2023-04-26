package com.ssafy.someauth.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refreshTokenId;

    @Column(unique = true)
    @NotNull
    @Size(max = 100)
    private String userId;

    @NotNull
    @Size(max = 256)
    private String tokenValue;

    public RefreshToken(
            String userId,
            String tokenValue
    ) {
        this.userId = userId;
        this.tokenValue = tokenValue;
    }
}
