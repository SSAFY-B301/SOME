package com.ssafy.somefriendgirl.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GpsRequestDto {

    private Integer section;
    private Double latitude;
    private Double longitude;

}
