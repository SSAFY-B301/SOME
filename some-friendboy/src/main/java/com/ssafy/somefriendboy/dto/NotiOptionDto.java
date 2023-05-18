package com.ssafy.somefriendboy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.somefriendboy.entity.status.NotiType;
import lombok.Data;

@Data
public class NotiOptionDto {

    private NotiType type;
    @JsonProperty("is_agree")
    private boolean isAgree;
}
