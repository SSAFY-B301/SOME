package com.ssafy.somefriendboy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PhotoDto {

    @JsonProperty("noti_id")
    private Long notiId;

    @JsonProperty("photo_id")
    private Long photoId;

    @JsonProperty("photo_url")
    private String photoUrl;

    @JsonProperty("user_name")
    private String userName;

    @JsonProperty("upload_date")
    private LocalDateTime uploadDate;
}
