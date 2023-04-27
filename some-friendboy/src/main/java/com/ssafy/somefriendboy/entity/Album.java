package com.ssafy.somefriendboy.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.joda.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Album {

    @Id @Column(name = "album_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long albumId;

    @Column(name = "album_name")
    private String albumName;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "recent_photo")
    private Long recentPhoto;

    private String status;

    @Builder
    public Album(String albumName){
        this.albumName = albumName;
        this.createdDate = LocalDateTime.now();
    }
}
