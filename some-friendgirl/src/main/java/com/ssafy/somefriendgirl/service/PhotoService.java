package com.ssafy.somefriendgirl.service;

import com.ssafy.somefriendgirl.dto.AlbumPhotoDto;
import com.ssafy.somefriendgirl.dto.PhotoLikeDto;
import com.ssafy.somefriendgirl.dto.ResponseDto;
import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import com.ssafy.somefriendgirl.entity.User;
import com.ssafy.somefriendgirl.repository.photo.PhotoRepository;
import com.ssafy.somefriendgirl.repository.user.UserRepository;
import com.ssafy.somefriendgirl.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class PhotoService {

    private final ResponseUtil responseUtil;
    private final RedisTemplate redisTemplate;
    private final PhotoRepository photoRepository;
    private final UserRepository userRepository;

    public ResponseDto selectPhoto(String accessToken, Long photoId) {
        Map<String, Object> result = new HashMap<>();
        String userId = responseUtil.tokenCheck(accessToken);

        if (userId == null) {
            return responseUtil.setResponseDto(result, "토큰 만료", 450);
        }

        AlbumPhoto albumPhoto = photoRepository.findByPhotoId(photoId);
        AlbumPhotoDto albumPhotoDto = new AlbumPhotoDto(albumPhoto);

        User user = userRepository.findByUserId(userId);
        albumPhotoDto.setUserId(user.getUserId());
        albumPhotoDto.setUserName(user.getUserName());
        albumPhotoDto.setUserProfileImg(user.getUserImg());


        /* 캐시 :: 조회수 증가 */
        ValueOperations valueOperations = redisTemplate.opsForValue();
        String viewKey = "photoViewCnt::" + photoId;
        if (valueOperations.get(viewKey) == null) {
            valueOperations.set(viewKey, String.valueOf(albumPhotoDto.getViewCnt() + 1), 20, TimeUnit.MINUTES);
        } else {
            valueOperations.increment(viewKey);
        }
        Long viewCnt = Long.parseLong((String) valueOperations.get(viewKey));
        albumPhotoDto.setViewCnt(viewCnt);
        log.info("서버에서 가져온 조회수 viewCnt = " + viewCnt);


        /* 캐시 :: 좋아요 수 가져오기 */
        String likeKey = "photoLikeCnt::" + photoId;
        Long likeCnt = 0L;
        if (valueOperations.get(likeKey) == null) {
            likeCnt = albumPhoto.getLikeCnt();
            log.info("DB에서 가져온 좋아요 수 likeCnt = " + likeCnt);
        } else {
            likeCnt = (Long) valueOperations.get(likeKey);
            log.info("캐시서버에서 가져온 좋아요 수 likeCnt = " + likeCnt);
        }
        albumPhotoDto.setLikeCnt(likeCnt);


        /* 캐시 :: 사용자의 좋아요 여부 가져오기 */
        String userPhotoLikeList;
        String likeListKey = "UserPhotoLikeList::" + userId;
        if (valueOperations.get(likeListKey) == null) {
            userPhotoLikeList = user.getUserLikePhotos();
        } else {
            userPhotoLikeList = (String) valueOperations.get(likeListKey);
        }

        if (userPhotoLikeList == null) {
            albumPhotoDto.setUserLikeStatus(false);
        } else {
            albumPhotoDto.setUserLikeStatus(userPhotoLikeList.contains(photoId + ","));
        }

        result.put("AlbumPhotoDto", albumPhotoDto);
        return responseUtil.setResponseDto(result, "사진 조회", 200);
    }
}
