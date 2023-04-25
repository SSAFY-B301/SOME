package com.ssafy.someauth.repository;

import com.ssafy.someauth.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByUserId(String userId);
    RefreshToken findByUserIdAndRefreshTokenId(String userId, String refreshToken);
}
