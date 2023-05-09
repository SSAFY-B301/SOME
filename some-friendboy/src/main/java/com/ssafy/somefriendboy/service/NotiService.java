package com.ssafy.somefriendboy.service;

import com.ssafy.somefriendboy.dto.NotiInviteCreateDto;
import com.ssafy.somefriendboy.dto.NotiSnsCreateDto;
import com.ssafy.somefriendboy.dto.NotiUploadCreateDto;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.repository.noti.EmitterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotiService {

    public void inviteNoti(String sender_id,String[] receiver_ids,Long album_id){
        String url = "http://3.35.18.146:9003/noti/noti/invite";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        NotiInviteCreateDto notiInviteCreateDto = NotiInviteCreateDto.builder()
                .senderId(sender_id)
                .receivers(List.of(receiver_ids))
                .albumId(album_id)
                .build();
        HttpEntity<?> requestMessage = new HttpEntity<>(notiInviteCreateDto, httpHeaders);

        restTemplate.postForEntity(url, requestMessage, Object.class);
    }
    public ResponseDto snsNoti(NotiSnsCreateDto notiSnsCreateDto){
        String url = "http://3.35.18.146:9003/noti/noti/sns";
        Map<String,Object> result = new HashMap<>();


        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<?> requestMessage = new HttpEntity<>(notiSnsCreateDto, httpHeaders);
        restTemplate.postForEntity(url, requestMessage, Object.class);

        return setResponseDto(result,"sns 동의 요청 성공",200);
    }
    public void uploadNoti(String sender_id,Long photo_id,Long album_id){
        String url = "http://3.35.18.146:9003/noti/noti/upload";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        NotiUploadCreateDto notiUploadCreateDto = NotiUploadCreateDto.builder()
                .albumId(album_id)
                .photoId(photo_id)
                .senderId(sender_id)
                .build();
        HttpEntity<?> requestMessage = new HttpEntity<>(notiUploadCreateDto, httpHeaders);
        restTemplate.postForEntity(url, requestMessage, Object.class);
    }
    private ResponseDto setResponseDto(Map<String,Object> result, String message, int statusCode){
        ResponseDto responseDto = new ResponseDto();
        responseDto.setData(result);
        responseDto.setMessage(message);
        responseDto.setStatusCode(statusCode);
        return responseDto;
    }
}
