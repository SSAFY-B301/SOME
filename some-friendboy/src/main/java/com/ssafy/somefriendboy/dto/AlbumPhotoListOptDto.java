package com.ssafy.somefriendboy.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class AlbumPhotoListOptDto {

    private Long albumId;
    private Long categoryId;
    private List<String> userId;

}
