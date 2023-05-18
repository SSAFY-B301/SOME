package com.ssafy.somefriendboy.entity;

import com.ssafy.somefriendboy.entity.id.AlbumMemberId;
import com.ssafy.somefriendboy.entity.status.LikeStatus;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumFav {
    @EmbeddedId
    private AlbumMemberId albumMemberId;

    @Column(name = "album_fav_status")
    @Enumerated(EnumType.STRING)
    private LikeStatus likeStatus;
}
