package com.ssafy.somefriendgirl.dto;

import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class AlbumPhotoDto {

    private Long photoId;
    private LocalDateTime uploadedDate;
    private String s3Url;
    private Double mapLatitude;
    private Double mapLongitude;
    private String userId;
    private String userName;
    private String userProfileImg;
    private Long likeCnt;
    private Long viewCnt;
    private boolean userLikeStatus;

    public AlbumPhotoDto(AlbumPhoto albumPhoto) {
        this.photoId = albumPhoto.getPhotoId();
        this.uploadedDate = albumPhoto.getUploadedDate();
        this.s3Url = albumPhoto.getOriginUrl();
        this.mapLatitude = albumPhoto.getMapLatitude();
        this.mapLongitude = albumPhoto.getMapLongitude();
        this.likeCnt = albumPhoto.getLikeCnt();
        this.viewCnt = albumPhoto.getViewCnt();
    }
}
