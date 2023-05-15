package com.ssafy.somefriendboy.dto;

import com.ssafy.somefriendboy.entity.AlbumPhoto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SNSPhotoDto {

    private Long photoId;
    private Long albumId;
    private String albumName;
    private String s3Url;

    public SNSPhotoDto(AlbumPhoto albumPhoto) {
        this.photoId = albumPhoto.getPhotoId();
        this.s3Url = albumPhoto.getOriginUrl();
        this.albumId = albumPhoto.getAlbumId();
    }

}
