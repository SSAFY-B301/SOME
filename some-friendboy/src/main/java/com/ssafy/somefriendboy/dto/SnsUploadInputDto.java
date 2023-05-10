package com.ssafy.somefriendboy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SnsUploadInputDto {
    @JsonProperty("album_id")
    private Long albumId;

    @JsonProperty("photo_id")
    private Long photoId;
}
