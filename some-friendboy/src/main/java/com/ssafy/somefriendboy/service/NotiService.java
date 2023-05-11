package com.ssafy.somefriendboy.service;

import com.ssafy.somefriendboy.dto.*;
import com.ssafy.somefriendboy.entity.Album;
import com.ssafy.somefriendboy.entity.AlbumPhoto;
import com.ssafy.somefriendboy.entity.FeedBack;
import com.ssafy.somefriendboy.entity.Notification;
import com.ssafy.somefriendboy.entity.status.NotiType;
import com.ssafy.somefriendboy.repository.album.AlbumRepository;
import com.ssafy.somefriendboy.repository.albumphoto.AlbumPhotoRepository;
import com.ssafy.somefriendboy.repository.feedback.FeedBackRepository;
import com.ssafy.somefriendboy.repository.noti.EmitterRepository;
import com.ssafy.somefriendboy.repository.noti.NotificationRepository;
import com.ssafy.somefriendboy.repository.user.UserRepository;
import com.ssafy.somefriendboy.util.HttpUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotiService {
    private final FeedBackRepository feedBackRepository;
    private final HttpUtil httpUtil;
    private final NotificationRepository notificationRepository;
    private final AlbumPhotoRepository albumPhotoRepository;
    private final AlbumRepository albumRepository;
    private final UserRepository userRepository;
    private final RabbitTemplate rabbitTemplate;
    private static final String EXCHANGE_NAME = "some.noti";
    public ResponseDto getUploadList(String accessToken) {
        String userId = tokenCheck(accessToken);
        if (userId == null) {
            return setResponseDto(false, "토큰 만료", 450);
        }
        List<Notification> photoIdNotChecked = notificationRepository.findPhotoIdNotChecked(userId);
        List<Long> listNotiId = new ArrayList<>();
        List<Long> listPhotoId = new ArrayList<>();
        for (Notification notification : photoIdNotChecked) {
                listPhotoId.add(notification.getAlbumOrPhotoId());
                listNotiId.add(notification.getId());
        }
        List<AlbumPhoto> byPhotoId = albumPhotoRepository.findByPhotoIdIn(listPhotoId);
        Map<Long,UncheckedPhotoDto> dto = new HashMap<>();
        int i=0;
        for (AlbumPhoto albumPhoto : byPhotoId) {
            Long albumId = albumPhoto.getAlbumId();
            if(dto.get(albumId) == null){
                dto.put(albumId,
                        UncheckedPhotoDto.builder()
                            .albumId(albumId)
                            .albumName(albumRepository.findById(albumId).get().getAlbumName())
                            .photoList(new ArrayList<>())
                            .build());
            }
            UncheckedPhotoDto uncheckedPhotoDto = dto.get(albumId);
            if(uncheckedPhotoDto.getRecentUploadTime() == null || uncheckedPhotoDto.getRecentUploadTime().isBefore(albumPhoto.getUploadedDate())){
                uncheckedPhotoDto.setRecentUploadTime(albumPhoto.getUploadedDate());
                uncheckedPhotoDto.setThumbnailPhoto(albumPhoto.getResizeUrl());
            }
            uncheckedPhotoDto.getPhotoList().add(PhotoDto.builder()
                            .uploadDate(albumPhoto.getUploadedDate())
                            .userName(userRepository.findByUserId(albumPhoto.getUserId()).getUserName())
                            .photoUrl(albumPhoto.getOriginUrl())
                            .photoId(albumPhoto.getPhotoId())
                            .notiId(listNotiId.get(i++))
                            .build());
        }
        List<UncheckedPhotoDto> list = new ArrayList<>(dto.values());
        Collections.sort(list);

        return setResponseDto(list,"최근 업로드 사진 목록",200);
    }

    public ResponseDto sendSnsMQ(String accessToken, SnsUploadInputDto snsUploadInputDto) {
        String userId = tokenCheck(accessToken);
        if(userId == null){
            return setResponseDto(null,"토큰 만료",450);
        }

        MQDto mqDto = MQDto.builder()
                .type(NotiType.SNS)
                .data(NotiSnsCreateDto.builder()
                        .senderId(userId)
                        .photoId(snsUploadInputDto.getPhotoId())
                        .albumId(snsUploadInputDto.getAlbumId())
                        .build())
                .build();
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, "some.route.#", mqDto);
        return setResponseDto(true, "SNS 동의 요청 알림",200);
    }
    public ResponseDto writeFeedBack(String accessToken, String content) {
        String userId = tokenCheck(accessToken);
        if(userId == null){
            return setResponseDto(null,"토큰 만료",450);
        }
        FeedBack feedBack = FeedBack.builder()
                .content(content)
                .writer(userRepository.findByUserId(userId).getUserName())
                .build();
        feedBackRepository.save(feedBack);
        return setResponseDto(true,"피드백",200);
    }
    public void inviteNoti(String sender_id, String[] receiver_ids, Long album_id){
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

    private ResponseDto setResponseDto(Object result, String message, int statusCode){
        ResponseDto responseDto = new ResponseDto();
        responseDto.setData(result);
        responseDto.setMessage(message);
        responseDto.setStatusCode(statusCode);
        return responseDto;
    }

    private String tokenCheck(String accessToken) {
        return httpUtil.requestParingToken(accessToken);
    }
}
