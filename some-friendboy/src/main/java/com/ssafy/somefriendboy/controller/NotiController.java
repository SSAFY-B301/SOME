package com.ssafy.somefriendboy.controller;

import com.ssafy.somefriendboy.dto.NotiCreateDto;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.service.NotiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    /* SSE 구독 */
    @GetMapping(value = "/subscribe/{userId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable String userId, @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId){
        return notiService.subscribe(userId, lastEventId);
    }

    @PostMapping()
    public ResponseEntity<ResponseDto> albumWholeList(@RequestBody NotiCreateDto notiCreateDto) {
        log.debug("알림 생성 요청 POST: /noti, NotiCreateDto : {}", notiCreateDto);
        ResponseDto responseDto = notiService.sendNoti(notiCreateDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
}
