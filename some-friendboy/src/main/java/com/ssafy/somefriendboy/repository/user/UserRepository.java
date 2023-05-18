package com.ssafy.somefriendboy.repository.user;

import com.ssafy.somefriendboy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUserId(String userId);
}
