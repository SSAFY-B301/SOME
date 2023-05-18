package com.ssafy.somefriendboy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AlbumMemberIdAndProfileDto {

    @JsonProperty("id")
    private String userId;

    @JsonProperty("profile_img_url")
    private String profileImgUrl;
}
