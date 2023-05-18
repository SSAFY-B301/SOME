package com.ssafy.somefriendboy.repository.noti;


import com.ssafy.somefriendboy.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long>,NotificationRepositoryCustom {
}
