package com.ssafy.somefriendboy.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class AlbumMember {
    @EmbeddedId
    private AlbumMemberId albumMemberId;
}
