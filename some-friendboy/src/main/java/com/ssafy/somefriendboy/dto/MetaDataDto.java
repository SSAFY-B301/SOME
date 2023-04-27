package com.ssafy.somefriendboy.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
public class MetaDataDto {

    private MultipartFile multipartFile;
    private String url;

}
