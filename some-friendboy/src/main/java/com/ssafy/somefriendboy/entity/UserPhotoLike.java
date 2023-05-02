package com.ssafy.somefriendboy.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserPhotoLike {
    @EmbeddedId
    private UserPhotoLikeId userPhotoLikeId;
    @Enumerated(EnumType.STRING)
    private LikeStatus userPhotoLikeStatus;
}
