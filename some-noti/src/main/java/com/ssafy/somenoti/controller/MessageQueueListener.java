package com.ssafy.somenoti.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.somenoti.dto.*;
import com.ssafy.somenoti.entity.NotiType;
import com.ssafy.somenoti.service.CategoryService;
import com.ssafy.somenoti.service.NotiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class MessageQueueListener {
    private final NotiService notiService;
    private final CategoryService categoryService;

    @RabbitListener(queues = "some.queue")
    public void receiveMessage(MQDto message) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        if(message.getType().equals(NotiType.INVITE)){
            NotiInviteCreateDto notiInviteCreateDto = mapper.convertValue(message.getData(),NotiInviteCreateDto.class);
            log.info(notiInviteCreateDto.getAlbumId()+"번 앨범 초대 알림 생성 요청 ");
            notiService.sendInviteNoti(notiInviteCreateDto);
        }
        else if(message.getType().equals(NotiType.UPLOAD)){
            NotiUploadCreateDto notiUploadCreateDto = mapper.convertValue(message.getData(),NotiUploadCreateDto.class);
            log.info(notiUploadCreateDto.getAlbumId()+"번 앨범 사진 업로드 알림 생성 요청 ");
            notiService.sendUploadNoti(notiUploadCreateDto);
        }
        else if(message.getType().equals(NotiType.SNS)){
            NotiSnsCreateDto notiSnsCreateDto = mapper.convertValue(message.getData(),NotiSnsCreateDto.class);
            log.info(notiSnsCreateDto.getAlbumId()+"번 앨범 " + notiSnsCreateDto.getPhotoId()+"번 사진 SNS 알림 요청");
            notiService.sendSnsNoti(notiSnsCreateDto);
        }
        else if(message.getType().equals(NotiType.AI)){
            AiCategoryCreateDto aiCategoryCreateDto = mapper.convertValue(message.getData(), AiCategoryCreateDto.class);
            log.info("AI 사진분류 요청");
            categoryService.photoCategory(aiCategoryCreateDto);
        }
    }
}