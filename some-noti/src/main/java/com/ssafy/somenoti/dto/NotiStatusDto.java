package com.ssafy.somenoti.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.somenoti.entity.NotiStatus;
import com.ssafy.somenoti.entity.NotiType;
import lombok.Data;

@Data
public class NotiStatusDto {
    @JsonProperty("noti_id")
    private Long notiId;

    @JsonProperty("noti_status")
    private NotiStatus notiStatus;
}
