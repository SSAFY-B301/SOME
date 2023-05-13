package com.ssafy.somenoti.controller;

import com.ssafy.somenoti.dto.*;
import com.ssafy.somenoti.service.NotiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/noti")
@Slf4j
public class NotiController {

    private final NotiService notiService;
    /* SSE 구독 */
    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@RequestHeader HttpHeaders headers, @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId){
        log.info("알림 구독 요청 GET: /noti/subscribe");
        String access_token = headers.get("access_token").toString();

        return notiService.subscribe(access_token, lastEventId);
    }

    @PostMapping("/invite")
    public ResponseEntity<ResponseDto> albumInvite(@RequestBody NotiInviteCreateDto notiCreateDto) {
        log.info("앨범 초대 알림 생성 요청 POST: /noti/invite, NotiInviteCreateDto : {}", notiCreateDto);
        ResponseDto responseDto = notiService.sendInviteNoti(notiCreateDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
    @PutMapping("/invite")
    public ResponseEntity<ResponseDto> albumInviteResponse(@RequestHeader HttpHeaders headers, @RequestBody InviteResponseDto inviteResponseDto) {
        log.info("앨범 초대 응답 요청 PUT: /noti/invite, InviteResponseDto : {}", inviteResponseDto);
        String access_token = headers.get("access_token").toString();
        ResponseDto responseDto = notiService.replyInviteNoti(access_token,inviteResponseDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/sns")
    public ResponseEntity<ResponseDto> photoSns(@RequestBody NotiSnsCreateDto notiCreateDto) {
        log.info("SNS동의 요청 알림 생성 POST: /noti/sns, NotiSnsCreateDto : {}", notiCreateDto);
        ResponseDto responseDto = notiService.sendSnsNoti(notiCreateDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
    @PutMapping("/sns")
    public ResponseEntity<ResponseDto> photoSnsResponse(@RequestHeader HttpHeaders headers, @RequestBody SnsResponseDto SnsResponseDto) {
        log.info("SNS동의 요청 응답 PUT: /noti/sns, SnsResponseDto : {}", SnsResponseDto);
        String access_token = headers.get("access_token").toString();
        ResponseDto responseDto = notiService.replySnsNoti(access_token, SnsResponseDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
    @PostMapping("/upload")
    public ResponseEntity<ResponseDto> photoUpload(@RequestBody NotiUploadCreateDto notiUploadCreateDto) {
        log.info("사진 업로드 알림 생성 POST: /noti/upload, NotiUploadCreateDto : {}", notiUploadCreateDto);
        ResponseDto responseDto = notiService.sendUploadNoti(notiUploadCreateDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
    @GetMapping("/list")
    public ResponseEntity<ResponseDto> listNotiSnsInvite(@RequestHeader HttpHeaders headers, Pageable pageable) {
        log.info("GET: /noti/list, offset : {}, limit : {}",pageable.getOffset(),pageable.getPageSize());
        String access_token = headers.get("access_token").toString();
        ResponseDto responseDto = notiService.listNotiSnsInvite(access_token,pageable);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PutMapping("/status")
    public ResponseEntity<ResponseDto> notiStatusChange(@RequestHeader HttpHeaders headers, @RequestBody NotiStatusDto notiStatusDto) {
        log.info("PUT: /noti/status, notiId : {}, target-status : {}",notiStatusDto.getNotiId(),notiStatusDto.getNotiStatus());
        String access_token = headers.get("access_token").toString();
        ResponseDto responseDto = notiService.changeNotiStatus(access_token,notiStatusDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
}
