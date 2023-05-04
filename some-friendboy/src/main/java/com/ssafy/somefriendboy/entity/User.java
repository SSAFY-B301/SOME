package com.ssafy.somefriendboy.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "user")
public class User {

    @Id
    @Column(length = 100, unique = true)
    @NotNull
    @Size(max = 100)
    private String userId;

    @Column(length = 30)
    @NotNull
    @Size(max = 30)
    private String userName;

    @Column(length = 100, unique = true)
    @NotNull
    @Size(max = 100)
    private String userEmail;

    @Column(length = 500)
    @NotNull
    @Size(max = 500)
    private String userImg;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @NotNull
    private LocalDateTime createdDate;

    @Builder
    public User (
            String userId,
            String userName,
            String userEmail,
            String userImg,
            LocalDateTime createdDate
    ) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userImg = userImg;
        this.createdDate = createdDate;
    }
}