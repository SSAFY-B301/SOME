package com.ssafy.somefriendgirl.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class GpsRangeDto {

    private Double startLat;
    private Double startLon;
    private Double endLat;
    private Double endLon;

}
