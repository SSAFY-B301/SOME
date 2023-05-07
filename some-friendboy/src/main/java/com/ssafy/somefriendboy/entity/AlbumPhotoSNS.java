package com.ssafy.somefriendboy.entity;

import lombok.*;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumPhotoSNS {

    @EmbeddedId
    private AlbumPhotoSnsId albumPhotoSnsId;

    private AlbumPhotoSnsStatus status;
}
