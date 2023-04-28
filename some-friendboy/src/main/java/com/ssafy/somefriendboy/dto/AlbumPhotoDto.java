package com.ssafy.somefriendboy.dto;

import com.ssafy.somefriendboy.entity.AlbumPhoto;
import lombok.*;
import java.time.LocalDateTime;

import java.util.List;

@Getter
@Setter
public class AlbumPhotoDto {

    private Long photoId;
    private LocalDateTime uploadedDate;
    private LocalDateTime shootDate;
    private String s3Url;
    private Double gpsLatitude;
    private Double gpsLongitude;
    private List<Long> categoryId;
    private String userId;
    private Long albumId;

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
