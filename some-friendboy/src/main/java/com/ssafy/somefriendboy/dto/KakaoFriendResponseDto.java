package com.ssafy.somefriendboy.dto;

import lombok.Data;

import java.util.List;

@Data
public class KakaoFriendResponseDto {
    private String afterUrl;
    private List<Friend> elements;
    private int totalCount;
    private int favoriteCount;

    @Data
    public static class Friend {
        private long id;
        private String uuid;
        private boolean favorite;
        private String profileNickname;
        private String profileThumbnailImage;
    }
}
