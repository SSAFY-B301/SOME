package com.ssafy.somefriendboy.repository.noti;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NotificationRepositoryCustom {
    List<Long> findPhotoIdNotChecked(String userId);
}
