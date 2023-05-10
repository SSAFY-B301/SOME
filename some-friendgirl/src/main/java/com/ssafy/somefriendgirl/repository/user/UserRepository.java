package com.ssafy.somefriendgirl.repository.user;

import com.ssafy.somefriendgirl.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String>, UserRepositoryCustom {
    User findByUserId(String userId);
}