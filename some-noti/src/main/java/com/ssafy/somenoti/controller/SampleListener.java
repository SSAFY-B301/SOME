package com.ssafy.somenoti.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.somenoti.dto.MQDto;
import com.ssafy.somenoti.dto.NotiInviteCreateDto;
import com.ssafy.somenoti.dto.NotiSnsCreateDto;
import com.ssafy.somenoti.dto.NotiUploadCreateDto;
import com.ssafy.somenoti.entity.NotiType;
import com.ssafy.somenoti.service.NotiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class SampleListener {
    private final NotiService notiService;


    @RabbitListener(queues = "test.queue")
    public void receiveMessage(MQDto message) {
        log.info(message.toString());
        ObjectMapper mapper = new ObjectMapper();
        if(message.getType().equals(NotiType.INVITE)){
            NotiInviteCreateDto notiInviteCreateDto = mapper.convertValue(message.getData(),NotiInviteCreateDto.class);
            notiService.sendInviteNoti(notiInviteCreateDto);
        }
        else if(message.getType().equals(NotiType.UPLOAD)){
            NotiUploadCreateDto notiUploadCreateDto = mapper.convertValue(message.getData(),NotiUploadCreateDto.class);
            notiService.sendUploadNoti(notiUploadCreateDto);
        }
        else if(message.getType().equals(NotiType.SNS)){
            NotiSnsCreateDto notiSnsCreateDto = mapper.convertValue(message.getData(),NotiSnsCreateDto.class);
            notiService.sendSnsNoti(notiSnsCreateDto);
        }
    }
}