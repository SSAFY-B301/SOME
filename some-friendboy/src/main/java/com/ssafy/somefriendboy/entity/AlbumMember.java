package com.ssafy.somefriendboy.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class AlbumMember {
    @Id
    private String userId;
    @Id
    private Long albumId;
}
