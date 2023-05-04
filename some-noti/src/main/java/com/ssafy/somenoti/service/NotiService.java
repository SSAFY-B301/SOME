package com.ssafy.somenoti.service;

import com.ssafy.somenoti.dto.*;
import com.ssafy.somenoti.entity.NotiStatus;
import com.ssafy.somenoti.entity.NotiType;
import com.ssafy.somenoti.entity.Notification;
import com.ssafy.somenoti.entity.User;
import com.ssafy.somenoti.repository.albummember.AlbumMemberRepository;
import com.ssafy.somenoti.repository.noti.EmitterRepository;
import com.ssafy.somenoti.repository.noti.NotificationRepository;
import com.ssafy.somenoti.repository.user.UserRepository;
import com.ssafy.somenoti.util.HttpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class NotiService {
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final EmitterRepository emitterRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final AlbumMemberRepository albumMemberRepository;
    private final HttpUtil httpUtil;

    public SseEmitter subscribe(String userId, String lastEventId) {
        String id = userId + "_" + System.currentTimeMillis();

        SseEmitter emitter = emitterRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));

        emitter.onCompletion(() -> emitterRepository.deleteById(id));
        emitter.onTimeout(() -> emitterRepository.deleteById(id));
        // 503 에러를 방지하기 위한 더미 이벤트 전송
        sendToClient(emitter, id, "EventStream Created. [userId=" + userId + "]");
        // 클라이언트가 미수신한 Event 목록이 존재할 경우 전송하여 Event 유실을 예방
        if (!lastEventId.isEmpty()) {
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithId(String.valueOf(userId));
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue()));
        }

        return emitter;
    }
    public ResponseDto sendInviteNoti(NotiInviteCreateDto notiCreateDto) {
        ResponseDto responseDto = new ResponseDto();
        List<String> receivers = notiCreateDto.getReceivers();
        Optional<User> byId = userRepository.findById(notiCreateDto.getSenderId());
        if(byId.isEmpty()){
            responseDto.setStatusCode(400);
            responseDto.setMessage("유저 정보 없음");
            return responseDto;
        }
        User sender = byId.get();
        sendNoti(NotiType.Invite,receivers,sender,notiCreateDto.getAlbumId());

        responseDto.setStatusCode(200);
        responseDto.setMessage("앨범 초대 알림 성공");
        return responseDto;
    }

    public ResponseDto sendSnsNoti(NotiSnsCreateDto notiSnsDto){
        ResponseDto responseDto = new ResponseDto<>();
        Optional<User> byId = userRepository.findById(notiSnsDto.getSenderId());
        if(byId.isEmpty()){
            responseDto.setStatusCode(400);
            responseDto.setMessage("유저 정보 없음");
            return responseDto;
        }
        User sender = byId.get();
        List<String> receivers = albumMemberRepository.findAlbumMemberIdByAlbumId(notiSnsDto.getAlbumId());
        sendNoti(NotiType.SNS,receivers,sender, notiSnsDto.getPhotoId());
        responseDto.setStatusCode(200);
        responseDto.setMessage("SNS동의 요청 알림 성공");
        return responseDto;
    }
    public ResponseDto listNotiSnsInvite(String accessToken, Pageable pageable) {
        Map<String,Object> result = new HashMap<>();
        String userId = tokenCheck(accessToken);
        if(userId == null){
            return setResponseDto(result,"토큰 만료",450);
        }
        Page<NotiDto> notiList = notificationRepository.findNotiList(userId, pageable);
        result.put("notiList",notiList.getContent());
        result.put("total_page",notiList.getTotalPages());
        result.put("now_page",notiList.getPageable().getPageNumber());
        result.put("is_last",notiList.isLast());
        result.put("is_first",notiList.isFirst());
        return setResponseDto(result,"알림 내역 불러오기",200);
    }
    public ResponseDto changeNotiStatus(String accessToken,NotiStatusDto notiStatusDto) {
        Map<String,Object> result = new HashMap<>();
        String userId = tokenCheck(accessToken);
        if(userId == null){
            return setResponseDto(false,"토큰 만료",450);
        }
        Notification notification = notificationRepository.findById(notiStatusDto.getNotiId()).get();
        notification.setStatus(notiStatusDto.getNotiStatus());

        return setResponseDto(true,"알림 상태 변경",200);
    }
    private void sendToClient(SseEmitter emitter, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(emitterId)
                    .data(data, MediaType.APPLICATION_JSON)
                    .reconnectTime(500));
        } catch (IOException exception) {
            emitterRepository.deleteById(emitterId);
        }
    }

    private void sendNoti(NotiType notiType, List<String> receivers,User sender,Long id){
        for (String receiverId : receivers) {
            User receiver = userRepository.findById(receiverId).get();
            Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterStartWithId(receiverId);
            Notification notification = Notification.builder()
                    .type(notiType)
                    .status(NotiStatus.UNCHECKED)
                    .createdDate(LocalDateTime.now())
                    .sender(sender)
                    .receiver(receiver)
                    .albumOrPhotoId(id)
                    .build();
            if(notiType.equals(NotiType.SNS)){
                notification.setMessage(sender.getUserName()+"님이 SNS 포스팅 동의 요청을 보냈습니다.");
            }
            else if(notiType.equals(NotiType.Invite)){
                notification.setMessage(sender.getUserName()+"님이 공유앨범에 초대했습니다.");
            }
            else if(notiType.equals(NotiType.Upload)){
                notification.setMessage(sender.getUserName()+"님이 공유앨범에 사진을 업로드 했습니다.");
            }
            notificationRepository.save(notification);


            sseEmitters.forEach(
                    (key, emitter) -> {
                        // 데이터 캐시 저장(유실된 데이터 처리하기 위함)
                        emitterRepository.saveEventCache(key, notification);
                        // 데이터 전송
                        sendToClient(emitter, key, setNotiData(notification));
                    }
            );
        }
    }
    private HashMap<String,Object> setNotiData(Notification notification){
        HashMap<String,Object> result = new HashMap<>();
        result.put("content",notification.getMessage());
        result.put("id",notification.getAlbumOrPhotoId());
        return result;
    }

    private ResponseDto setResponseDto(Object result, String message, int statusCode){
        ResponseDto responseDto = new ResponseDto();
        responseDto.setData(result);
        responseDto.setMessage(message);
        responseDto.setStatusCode(statusCode);
        return responseDto;
    }

    private String tokenCheck(String accessToken){
        return httpUtil.requestParingToken(accessToken);
    }
}
