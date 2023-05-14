package com.ssafy.somenoti.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class AiCategoryCreateDto {
    @JsonProperty("files")
    private List<MultipartFile> multipartFiles;

    @JsonProperty("photo_ids")
    private List<Long> photoIds;
}
