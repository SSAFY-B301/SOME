package com.ssafy.somefriendgirl.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PhotoLikeDto {

    @JsonProperty("photo_id")
    private Long photoId;

    @JsonProperty("like_photo_status")
    private boolean likePhotoStatus;

}
