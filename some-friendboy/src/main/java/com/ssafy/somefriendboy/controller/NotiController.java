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
    private final RabbitTemplate rabbitTemplate;
    private static final String EXCHANGE_NAME = "test.exchange";
    @PostMapping("/sns")
    public ResponseEntity<ResponseDto> albumWholeList(@RequestBody NotiSnsCreateDto notiCreateDto) {
        log.debug("SNS 알림 생성 요청 POST: /noti, NotiCreateDto : {}", notiCreateDto);
        MQDto mqDto = MQDto.builder()
                .type(NotiType.SNS)
                .data(notiCreateDto)
                .build();
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, "test.route.#", mqDto);
//        ResponseDto responseDto = notiService.snsNoti(notiCreateDto);
        ResponseDto responseDto = new ResponseDto<>();
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
}
