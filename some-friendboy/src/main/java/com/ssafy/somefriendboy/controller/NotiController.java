package com.ssafy.somefriendboy.controller;

import com.ssafy.somefriendboy.service.NotiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
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
}
