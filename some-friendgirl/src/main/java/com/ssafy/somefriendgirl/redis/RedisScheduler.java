package com.ssafy.somefriendgirl.redis;

import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import com.ssafy.somefriendgirl.repository.photo.PhotoRepository;
import com.ssafy.somefriendgirl.repository.photo.PhotoRepositoryCustom;
import com.ssafy.somefriendgirl.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
@EnableScheduling
public class RedisScheduler {

    private final RedisTemplate redisTemplate;
    private final UserRepository userRepository;
    private final PhotoRepository photoRepository;

    @Transactional
    @Scheduled(cron = "0 0/3 * * * *")
    public void deleteViewCntCacheFromRedis() {
        log.info("조회수 DB 백업");
        Set<String> redisKeys = redisTemplate.keys("photoViewCnt*");
        Iterator<String> it = redisKeys.iterator();

        while (it.hasNext()) {
            String data = it.next();
            Long photoId = Long.parseLong(data.split("::")[1]);
            Long viewCnt = Long.parseLong((String) redisTemplate.opsForValue().get(data));

            photoRepository.modifyPhotoViewCnt(photoId, viewCnt);
            redisTemplate.delete("photoViewCnt::" + photoId);
        }
    }

    @Transactional
    @Scheduled(cron = "0 0/1 * * * *")
    public void updateLikeCntAndListCacheFromRedis() {
        log.info("좋아요 수, 리스트 DB 백업");

        /* 좋아요 수 백업 */
        Set<String> likeCntKeys = redisTemplate.keys("photoLikeCnt*");
        Iterator<String> it = likeCntKeys.iterator();

        while (it.hasNext()) {
            String data = it.next();
            Long photoId = Long.parseLong(data.split("::")[1]);
            Long likeCnt = Long.parseLong((String) redisTemplate.opsForValue().get(data));
            photoRepository.modifyPhotoLikeCnt(photoId, likeCnt);
            redisTemplate.delete("photoLikeCnt::" + photoId);
        }

        /* 좋아요 리스트 백업 */
        Set<String> likeListKeys = redisTemplate.keys("UserPhotoLikeList*");
        it = likeListKeys.iterator();

        while (it.hasNext()) {
            String data = it.next();
            String userId = data.split("::")[1];
            String likeList = (String) redisTemplate.opsForValue().get(data);
            userRepository.modifyPhotoLikeList(userId, likeList);
            redisTemplate.delete("UserPhotoLikeList::" + userId);
        }
    }
}
