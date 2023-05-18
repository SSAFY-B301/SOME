package com.ssafy.somefriendboy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class NotiInviteCreateDto {
    @JsonProperty("sender_id")
    private String senderId;

    @JsonProperty("receiver_ids")
    private List<String> receivers = new ArrayList<>();

    @JsonProperty("album_id")
    private Long albumId;
}
