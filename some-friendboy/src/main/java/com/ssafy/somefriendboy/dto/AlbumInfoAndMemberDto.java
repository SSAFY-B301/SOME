package com.ssafy.somefriendboy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AlbumInfoAndMemberDto {

    @JsonProperty("album_id")
    private Long albumId;

    @JsonProperty("album_name")
    private String albumName;

    @JsonProperty("thumbnail_photo_url")
    private String thumbnail_photo_url;

    @JsonProperty("album_created_date")
    private LocalDateTime albumCreatedDate;

    @JsonProperty("members")
    private List<String> members;
}
