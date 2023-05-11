package com.ssafy.somefriendgirl.service;

import com.ssafy.somefriendgirl.dto.AlbumPhotoDto;
import com.ssafy.somefriendgirl.dto.PhotoLikeDto;
import com.ssafy.somefriendgirl.dto.ResponseDto;
import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import com.ssafy.somefriendgirl.entity.PhotoLikeStatus;
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
            likeCnt = Long.parseLong((String) valueOperations.get(likeKey));
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

        result.put("albumPhotoDto", albumPhotoDto);
        return responseUtil.setResponseDto(result, "사진 조회", 200);
    }

    public ResponseDto likePhoto(String accessToken, PhotoLikeDto photoLikeDto) {
        Map<String, Object> result = new HashMap<>();
        String userId = responseUtil.tokenCheck(accessToken);

        if (userId == null) {
            return responseUtil.setResponseDto(result, "토큰 만료", 450);
        }

        ValueOperations valueOperations = redisTemplate.opsForValue();
        String likeCntKey = "photoLikeCnt::" + photoLikeDto.getPhotoId();
        String likeListKey = "UserPhotoLikeList::" + userId;

        // 좋아요 누르기
        Long likeCnt = 0L;
        User user = userRepository.findByUserId(userId);
        if (!photoLikeDto.isLikePhotoStatus()) {

            /* 캐시 :: 사용자의 좋아요 리스트에 사진ID 추가 */
            if (valueOperations.get(likeListKey) == null) {
                String likeList = "";
                if (user.getUserLikePhotos() == null) {
                    likeList = photoLikeDto.getPhotoId() + ",";
                } else {
                    if (user.getUserLikePhotos().contains(photoLikeDto.getPhotoId() + ",")) {
                        return responseUtil.setResponseDto(result, "이미 좋아요 누른 사진", 400);
                    }
                    likeList = user.getUserLikePhotos() + photoLikeDto.getPhotoId() + ",";
                }
                valueOperations.set(likeListKey, likeList, 20, TimeUnit.MINUTES);
            } else {
                if (String.valueOf(valueOperations.get(likeListKey)).contains(photoLikeDto.getPhotoId() + ",")) {
                    return responseUtil.setResponseDto(result, "해당 사진 좋아요 중복", 400);
                }
                String likeList = valueOperations.get(likeListKey) + String.valueOf(photoLikeDto.getPhotoId()) + ",";
                valueOperations.set(likeListKey, likeList, 20, TimeUnit.MINUTES);
            }


            /* 캐시 :: 좋아요 수 증가시키기 */
            AlbumPhoto albumPhoto = photoRepository.findByPhotoId(photoLikeDto.getPhotoId());
            if (valueOperations.get(likeCntKey) == null) {
                valueOperations.set(likeCntKey, String.valueOf(albumPhoto.getLikeCnt() + 1), 20, TimeUnit.MINUTES);
            } else {
                valueOperations.increment(likeCntKey);
            }
            likeCnt = Long.parseLong((String) valueOperations.get(likeCntKey));
            log.info("증가시킨 좋아요 수 likeCnt = " + likeCnt);

            result.put("likePhotoStatus", PhotoLikeStatus.LIKE);
        }

        // 좋아요 취소하기
        else {

            /* 캐시 :: 사용자의 좋아요 리스트에 사진ID 제거 */
            StringBuilder sb = new StringBuilder();
            if (valueOperations.get(likeListKey) == null) {
                sb.append(user.getUserLikePhotos());
            } else {
                sb.append((String) valueOperations.get(likeListKey));
            }

            int photoIdIndex = sb.indexOf(photoLikeDto.getPhotoId() + ",");
            log.info("삭제할 사진ID index = " + photoIdIndex);
            sb.delete(photoIdIndex, photoIdIndex + String.valueOf(photoLikeDto.getPhotoId()).length() + 1);
            valueOperations.set(likeListKey, sb.toString(), 20, TimeUnit.MINUTES);
            result.put("likePhotoStatus", PhotoLikeStatus.UNLIKE);


            /* 캐시 :: 좋아요 수 감소시키기 */
            AlbumPhoto albumPhoto = photoRepository.findByPhotoId(photoLikeDto.getPhotoId());
            if (valueOperations.get(likeCntKey) == null) {
                valueOperations.set(likeCntKey, String.valueOf(albumPhoto.getLikeCnt() - 1), 20, TimeUnit.MINUTES);
            } else {
                valueOperations.decrement(likeCntKey);
            }
            likeCnt = Long.parseLong((String) valueOperations.get(likeCntKey));
            log.info("감소시킨 좋아요 수 likeCnt = " + likeCnt);

        }

        result.put("photoId", photoLikeDto.getPhotoId());
        result.put("updatedLikeCnt", likeCnt);
        result.put("userLikeList", (String) valueOperations.get(likeListKey));

        return responseUtil.setResponseDto(result, "사진 좋아요", 200);
    }
}
