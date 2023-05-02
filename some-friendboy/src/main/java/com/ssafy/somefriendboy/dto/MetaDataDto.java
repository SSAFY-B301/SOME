package com.ssafy.somefriendboy.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Builder
public class MetaDataDto {

    private String originUrl;
    private String resizeUrl;
    private List<Long> categoryId;

}
