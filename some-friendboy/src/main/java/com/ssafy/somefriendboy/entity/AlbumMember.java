package com.ssafy.somefriendboy.entity;

import lombok.*;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@Builder @Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumMember {
    @EmbeddedId
    private AlbumMemberId albumMemberId;
}
