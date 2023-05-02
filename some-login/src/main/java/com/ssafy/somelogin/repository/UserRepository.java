package com.ssafy.somelogin.repository;

import com.ssafy.somelogin.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String>, UserRepositoryCustom{
}
