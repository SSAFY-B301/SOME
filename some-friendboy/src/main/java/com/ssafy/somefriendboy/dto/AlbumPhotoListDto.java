package com.ssafy.somefriendboy.dto;

import com.ssafy.somefriendboy.entity.AlbumPhoto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class AlbumPhotoListDto {

    private Long photoId;
    private LocalDateTime uploadedDate;
    private String s3Url;
    private List<Long> categoryId;
    private String userId;
    private Long albumId;

    public AlbumPhotoListDto(AlbumPhoto albumPhoto) {
        this.photoId = albumPhoto.getPhotoId();
        this.uploadedDate = albumPhoto.getUploadedDate();
        this.s3Url = albumPhoto.getS3Url();
        this.categoryId = albumPhoto.getCategoryId();
        this.userId = albumPhoto.getUserId();
        this.albumId = albumPhoto.getAlbumId();
    }

}
