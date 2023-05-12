package com.ssafy.somefriendboy.service;

import com.ssafy.somefriendboy.dto.NotiOptionDto;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.entity.User;
import com.ssafy.somefriendboy.entity.status.AlbumMemberStatus;
import com.ssafy.somefriendboy.entity.status.NotiType;
import com.ssafy.somefriendboy.repository.albummember.AlbumMemberRepository;
import com.ssafy.somefriendboy.repository.albumphoto.AlbumPhotoRepository;
import com.ssafy.somefriendboy.repository.user.UserRepository;
import com.ssafy.somefriendboy.util.HttpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final HttpUtil httpUtil;
    private final AlbumPhotoRepository albumPhotoRepository;
    private final AlbumMemberRepository albumMemberRepository;
    private final UserRepository userRepository;

    public ResponseDto getMypage(String accessToken) {
        String userId = tokenCheck(accessToken);
        if (userId == null) {
            return setResponseDto(false, "토큰 만료", 450);
        }
        Map<String,Object> result = new HashMap<>();
        List<Long> myAlbumIdListByUserId = albumMemberRepository.findMyAlbumIdListByUserId(userId, AlbumMemberStatus.ACCEPT);
        result.put("accept_album_cnt",myAlbumIdListByUserId.size());

        Long friendgirlCnt = albumPhotoRepository.countFriendGirlPhotos(userId);
        result.put("friendgirl_cnt",friendgirlCnt);
        Optional<User> byId = userRepository.findById(userId);
        if(byId.isEmpty()){
            return setResponseDto(false, "유저 정보 없음 다시 로그인", 450);
        }
        User user = byId.get();
        result.put("invite_agree",user.getNotiInvite());
        result.put("sns_agree",user.getNotiSns());
        result.put("upload_agree",user.getNotiUpload());


        return setResponseDto(result,"마이페이지 데이터",200);
    }



    public ResponseDto changeNotiOption(String accessToken, NotiOptionDto notiOptionDto) {
        String userId = tokenCheck(accessToken);
        if (userId == null) {
            return setResponseDto(false, "토큰 만료", 450);
        }
        User user = userRepository.findById(userId).get();
        if(notiOptionDto.getType().equals(NotiType.SNS)){
            user.setNotiSns(notiOptionDto.isAgree());
        }
        else if(notiOptionDto.getType().equals(NotiType.INVITE)){
            user.setNotiInvite(notiOptionDto.isAgree());
        }
        else if(notiOptionDto.getType().equals(NotiType.UPLOAD)){
            user.setNotiUpload(notiOptionDto.isAgree());
        }
        return setResponseDto(true,notiOptionDto.getType().toString()+" 알림 설정 변경 성공",200);
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
