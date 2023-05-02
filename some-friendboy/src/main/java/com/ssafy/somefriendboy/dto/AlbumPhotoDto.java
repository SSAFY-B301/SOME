package com.ssafy.somefriendboy.dto;

import com.ssafy.somefriendboy.entity.AlbumPhoto;
import com.ssafy.somefriendboy.entity.LikeStatus;
import lombok.*;
import java.time.LocalDateTime;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class AlbumPhotoDto {

    private Long photoId;
    private LocalDateTime uploadedDate;
    private Date shootDate;
    private String s3Url;
    private Double gpsLatitude;
    private Double gpsLongitude;
    private List<Long> categoryId;
    private String userId;
    private String userName;
    private String userProfileImg;
    private Long albumId;
    private LikeStatus likeStatus;

    public AlbumPhotoDto(AlbumPhoto albumPhoto) {
        this.photoId = albumPhoto.getPhotoId();
        this.uploadedDate = albumPhoto.getUploadedDate();
        this.shootDate = albumPhoto.getShootDate();
        this.s3Url = albumPhoto.getS3Url();
        this.gpsLatitude = albumPhoto.getGpsLatitude();
        this.gpsLongitude = albumPhoto.getGpsLongitude();
        this.categoryId = albumPhoto.getCategoryId();
        this.userId = albumPhoto.getUserId();
        this.albumId = albumPhoto.getAlbumId();
    }

}
