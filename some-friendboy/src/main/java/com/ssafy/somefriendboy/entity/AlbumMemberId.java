package com.ssafy.somefriendboy.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class AlbumMemberId implements Serializable {
    @Column(name = "user_id")
    private String userId;

    @Column(name = "album_id")
    private Long albumId;
}
