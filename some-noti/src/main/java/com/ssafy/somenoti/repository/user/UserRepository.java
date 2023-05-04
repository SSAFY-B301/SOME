package com.ssafy.somenoti.repository.user;

import com.ssafy.somenoti.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String>, UserRepositoryCustom{
}
