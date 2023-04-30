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
public class AlbumModifyDto {

    @JsonProperty("album_id")
    private Long albumId;

    @JsonProperty("new_album_name")
    private String newAlbumName;
}
