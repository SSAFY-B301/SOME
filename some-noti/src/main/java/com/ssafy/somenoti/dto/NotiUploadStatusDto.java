package com.ssafy.somenoti.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class NotiUploadStatusDto {
    @JsonProperty("noti_ids")
    private List<Long> notiIds;
}
