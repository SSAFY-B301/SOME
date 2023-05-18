package com.ssafy.somefriendboy.dto;

import com.ssafy.somefriendboy.entity.status.NotiType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MQDto {
    private NotiType type;

    private Object data;
}
