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
@Builder
@AllArgsConstructor
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

    @Column(length = 5000)
    @Size(max = 5000)
    private String userLikePhotos;

    private Boolean notiSns;
    private Boolean notiInvite;
    private Boolean notiUpload;

}