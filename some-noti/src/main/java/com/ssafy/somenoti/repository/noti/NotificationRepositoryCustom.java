package com.ssafy.somenoti.repository.noti;

import com.ssafy.somenoti.dto.NotiDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NotificationRepositoryCustom {
    Page<NotiDto> findNotiList(String userId, Pageable pageable);

    void updateUploadNotiStatus(List<Long> notiIds);
}
