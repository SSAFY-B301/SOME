package com.ssafy.somenoti.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumPhotoSNS {

    @EmbeddedId
    private AlbumPhotoSnsId albumPhotoSnsId;

    @Enumerated(EnumType.STRING)
    private AlbumPhotoSnsStatus status;
}
