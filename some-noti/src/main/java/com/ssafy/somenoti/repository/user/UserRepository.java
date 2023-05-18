package com.ssafy.somenoti.repository.user;

import com.ssafy.somenoti.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,String>, UserRepositoryCustom{
    List<User> findByUserIdIn(List<String> userId);
}
