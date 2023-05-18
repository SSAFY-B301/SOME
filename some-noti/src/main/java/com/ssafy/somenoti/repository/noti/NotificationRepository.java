package com.ssafy.somenoti.repository.noti;


import com.ssafy.somenoti.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long>,NotificationRepositoryCustom {
}
