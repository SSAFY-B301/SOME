package com.ssafy.somefriendgirl.util;

import com.ssafy.somefriendgirl.dto.ResponseDto;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class ResponseUtil {

    private final HttpUtil httpUtil;

    public ResponseDto setResponseDto(Map<String, Object> result, String message, int statusCode) {
        ResponseDto responseDto = new ResponseDto();
        responseDto.setData(result);
        responseDto.setMessage(message);
        responseDto.setStatusCode(statusCode);
        return responseDto;
    }

    public String tokenCheck(String accessToken) {
        return httpUtil.requestParingToken(accessToken);
    }

}
