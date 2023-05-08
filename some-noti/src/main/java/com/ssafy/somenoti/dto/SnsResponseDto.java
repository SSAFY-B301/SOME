package com.ssafy.somenoti.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.somenoti.entity.AlbumPhotoSnsStatus;
import lombok.Data;

@Data
public class SnsResponseDto {
    @JsonProperty("noti_id")
    private Long notiId;

    @JsonProperty("photo_id")
    private Long photoId;

    private AlbumPhotoSnsStatus status;
}
