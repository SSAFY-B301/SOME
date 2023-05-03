package com.ssafy.somefriendboy.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AlbumPhotoListOptDto {

    private Long albumId;
    private Long categoryId;
    private List<String> userId;

}
