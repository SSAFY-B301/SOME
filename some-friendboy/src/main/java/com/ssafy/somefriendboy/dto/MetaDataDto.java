package com.ssafy.somefriendboy.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Builder
public class MetaDataDto {

    private String url;
    private List<Long> categoryId;

}
