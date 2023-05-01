package com.ssafy.somefriendboy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.somefriendboy.entity.NotiType;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class NotiInviteCreateDto {
    private NotiType type;

    @JsonProperty("sender_id")
    private String senderId;

    @JsonProperty("receiver_ids")
    private List<String> receivers = new ArrayList<>();
}
