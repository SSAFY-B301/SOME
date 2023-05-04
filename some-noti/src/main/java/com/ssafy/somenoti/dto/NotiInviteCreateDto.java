package com.ssafy.somenoti.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotiInviteCreateDto {
    @JsonProperty("sender_id")
    private String senderId;

    @JsonProperty("receiver_ids")
    private List<String> receivers = new ArrayList<>();

    @JsonProperty("album_id")
    private Long albumId;
}
