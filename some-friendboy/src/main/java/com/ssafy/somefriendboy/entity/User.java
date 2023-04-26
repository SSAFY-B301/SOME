package com.ssafy.somefriendboy.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class User {

    @Id
    private String UserId;

    private String userName;
    private String userEmail;
    private String profileImage;
    private String roleType;
    private LocalDateTime signUpDate;
}
