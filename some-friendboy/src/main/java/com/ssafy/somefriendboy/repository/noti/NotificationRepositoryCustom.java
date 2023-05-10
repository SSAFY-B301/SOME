package com.ssafy.somefriendboy.repository.noti;

import com.ssafy.somefriendboy.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NotificationRepositoryCustom {
    List<Notification> findPhotoIdNotChecked(String userId);
}
