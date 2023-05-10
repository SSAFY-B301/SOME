package com.ssafy.somefriendgirl.repository.user;

import com.ssafy.somefriendgirl.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUserId(String userId);
}