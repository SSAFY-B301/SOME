package com.ssafy.somefriendboy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class AlbumPhotoListOptDto {

    private Long albumId;
    private Long categoryId;
    private List<String> userId;

}
