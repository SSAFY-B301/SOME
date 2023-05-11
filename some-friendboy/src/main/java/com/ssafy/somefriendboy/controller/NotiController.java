package com.ssafy.somefriendboy.controller;

import com.ssafy.somefriendboy.dto.*;
import com.ssafy.somefriendboy.entity.status.NotiType;
import com.ssafy.somefriendboy.service.NotiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/noti")
@Slf4j
public class NotiController {

    private final NotiService notiService;

    @PostMapping("/sns")
    public ResponseEntity<ResponseDto> photoSnsAgree(@RequestHeader HttpHeaders headers,@RequestBody SnsUploadInputDto snsUploadInputDto) {
        log.debug("SNS 알림 생성 요청 POST: /noti/sns, SnsUploadInputDto : {}", snsUploadInputDto);
        String access_token = headers.get("access_token").toString();
        ResponseDto responseDto = notiService.sendSnsMQ(access_token,snsUploadInputDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
    @GetMapping("/list/upload")
    public ResponseEntity<ResponseDto> photoUploadList(@RequestHeader HttpHeaders headers) {
        String access_token = headers.get("access_token").toString();
        log.debug("사진 업로드 목록 요청 GET: /noti/list/upload, access_token : {}",access_token);

        ResponseDto responseDto = notiService.getUploadList(access_token);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/feedback")
    public ResponseEntity<ResponseDto> feedBack(@RequestHeader HttpHeaders headers, @RequestBody String content) {
        String access_token = headers.get("access_token").toString();
        log.debug("피드백 작성 POST: /noti/feedback, access_token : {}",access_token);

        ResponseDto responseDto = notiService.writeFeedBack(access_token,content);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
}
