package com.ssafy.somefriendgirl.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MetaDataDto {

    private Long photoId;
    private String originUrl;
    private String resizeUrl;

}
