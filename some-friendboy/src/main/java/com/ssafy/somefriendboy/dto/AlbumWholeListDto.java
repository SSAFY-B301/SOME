package com.ssafy.somefriendboy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.somefriendboy.entity.AlbumFav;
import com.ssafy.somefriendboy.entity.LikeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
//@AllArgsConstructor
@NoArgsConstructor
public class AlbumWholeListDto {
    @JsonProperty("album_id")
    private Long albumId;

    @JsonProperty("album_name")
    private String albumName;

    @JsonProperty("album_created_date")
    private LocalDateTime albumCreatedDate;

    // 표지사진
    @JsonProperty("thumbnail_photo_url")
    private String thumbnailPhotoUrl;

    // 최근 사진 id
    @JsonProperty("recent_photo_id")
    private Long recentPhotoId;

    // 즐겨찾기 여부
    @JsonProperty("isAlbumFav")
    private LikeStatus isAlbumFav;

    @QueryProjection
    public AlbumWholeListDto(Long albumId, String albumName, LocalDateTime albumCreatedDate, String thumbnailPhotoUrl, Long recentPhotoId, AlbumFav isAlbumFav) {
        this.albumId = albumId;
        this.albumName = albumName;
        this.albumCreatedDate = albumCreatedDate;
        this.thumbnailPhotoUrl = thumbnailPhotoUrl;
        this.recentPhotoId = recentPhotoId;
        this.isAlbumFav = isAlbumFav == null ? LikeStatus.CANCEL : isAlbumFav.getLikeStatus();
    }
}
