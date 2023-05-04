package com.ssafy.somenoti.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotiSnsCreateDto {
    @JsonProperty("sender_id")
    private String senderId;

    @JsonProperty("album_id")
    private Long albumId;

    @JsonProperty("photo_id")
    private Long photoId;


}
