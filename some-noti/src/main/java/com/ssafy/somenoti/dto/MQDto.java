package com.ssafy.somenoti.dto;

import com.ssafy.somenoti.entity.NotiType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MQDto implements Serializable {
    private NotiType type;

    private Object data;

    @Override
    public String toString() {
        return "NotiType : "+ type.toString();
    }
}
