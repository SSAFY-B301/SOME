package com.ssafy.somenoti.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.somenoti.entity.AlbumMemberStatus;
import lombok.Data;

@Data
public class InviteResponseDto {
    @JsonProperty("noti_id")
    private Long notiId;

    @JsonProperty("album_id")
    private Long albumId;

    private AlbumMemberStatus status;
}
