package com.ssafy.somefriendgirl.redis;

import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import com.ssafy.somefriendgirl.repository.photo.PhotoRepository;
import com.ssafy.somefriendgirl.repository.photo.PhotoRepositoryCustom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.Set;

import static com.ssafy.somefriendgirl.entity.QAlbumPhoto.albumPhoto;

@Slf4j
@Service
@RequiredArgsConstructor
@EnableScheduling
public class RedisScheduler {

    private final PhotoRepository photoRepository;
    private final RedisTemplate redisTemplate;

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

}
