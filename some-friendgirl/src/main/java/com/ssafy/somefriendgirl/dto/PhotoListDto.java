package com.ssafy.somefriendgirl.dto;

import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PhotoListDto {

    private Long photoId;
    private LocalDateTime uploadedDate;
    private String s3Url;
    private Double mapLatitude;
    private Double mapLongitude;
    private String userId;

    public PhotoListDto(AlbumPhoto albumPhoto) {
        this.photoId = albumPhoto.getPhotoId();
        this.uploadedDate = albumPhoto.getUploadedDate();
        this.s3Url = albumPhoto.getResizeUrl();
        this.mapLatitude = albumPhoto.getMapLatitude();
        this.mapLongitude = albumPhoto.getMapLongitude();
        this.userId = albumPhoto.getUserId();
    }

}
