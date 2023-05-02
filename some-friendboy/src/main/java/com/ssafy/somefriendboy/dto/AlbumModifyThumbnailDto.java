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
public class AlbumModifyThumbnailDto {

    @JsonProperty("album_id")
    private Long albumId;

    @JsonProperty("new_album_thumbnail_id")
    private Long newAlbumThumbnailId;
}
