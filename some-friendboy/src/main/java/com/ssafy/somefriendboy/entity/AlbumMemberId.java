package com.ssafy.somefriendboy.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class AlbumMemberId implements Serializable {
    @Column(name = "user_id")
    private String userId;

    @Column(name = "album_id")
    private Long albumId;
}
