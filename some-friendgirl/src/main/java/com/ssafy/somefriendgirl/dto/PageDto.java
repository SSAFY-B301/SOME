package com.ssafy.somefriendgirl.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PageDto {

    private Boolean is_first;
    private Boolean is_last;
    private int total_page;
    private int now_page;

}
