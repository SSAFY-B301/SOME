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
public class AlbumCreateDto {

    @JsonProperty("album_name")
    private String albumName;

    @JsonProperty("invite_friend")
    private String[] inviteFriend;
}
