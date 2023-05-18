package com.ssafy.somefriendboy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class KakaoFriendResponseDto {
    @JsonProperty("after_url")
    private String afterUrl;
    private List<Friend> elements;

    @JsonProperty("total_count")
    private int totalCount;
    @JsonProperty("favorite_count")
    private int favoriteCount;

    @Data
    public static class Friend {
        private long id;
        private String uuid;
        private boolean favorite;
        @JsonProperty("profile_nickname")
        private String profileNickname;
        @JsonProperty("profile_thumbnail_image")
        private String profileThumbnailImage;
    }
}
