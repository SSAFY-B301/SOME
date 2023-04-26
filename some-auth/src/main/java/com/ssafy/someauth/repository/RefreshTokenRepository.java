package com.ssafy.someauth.repository;

import com.ssafy.someauth.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Repository
public class RefreshTokenRepository {

    private RedisTemplate redisTemplate;

    public RefreshTokenRepository(final RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(final RefreshToken refreshToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(refreshToken.getUserId(), refreshToken.getTokenValue());
        redisTemplate.expire(refreshToken.getUserId(), 3, TimeUnit.DAYS);
    }

    public RefreshToken findByUserId(final String userId) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String refreshToken = valueOperations.get(userId);

        if (Objects.isNull(userId)) {
            return null;
        }

        return new RefreshToken(userId, refreshToken);
    }

    public RefreshToken findByUserIdAndTokenValue(final String userId, final String tokenValue) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String refreshToken = valueOperations.get(userId);

        if (Objects.isNull(refreshToken)) {
            return null;
        }

        if (!tokenValue.equals(refreshToken)) {
            return null;
        }

        return new RefreshToken(userId, refreshToken);
    }
}
