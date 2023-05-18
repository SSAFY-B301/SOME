package com.ssafy.somefriendboy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotiUploadCreateDto {
    @JsonProperty("sender_id")
    private String senderId;

    @JsonProperty("album_id")
    private Long albumId;

    @JsonProperty("photo_id")
    private Long photoId;
}
