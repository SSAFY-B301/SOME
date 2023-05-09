package com.ssafy.somenoti.repository.noti;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somenoti.dto.NotiDto;
import com.ssafy.somenoti.dto.QNotiDto;
import com.ssafy.somenoti.entity.NotiStatus;
import com.ssafy.somenoti.entity.NotiType;
import com.ssafy.somenoti.entity.QNotification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import static com.ssafy.somenoti.entity.QNotification.notification;
import static com.ssafy.somenoti.entity.QUser.user;

import java.util.List;

@RequiredArgsConstructor
public class NotificationRepositoryImpl implements NotificationRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<NotiDto> findNotiList(String userId, Pageable pageable) {
        QueryResults<NotiDto> results = queryFactory
                .select(new QNotiDto(
                        notification.id,
                        notification.sender.userName,
                        notification.albumOrPhotoId,
                        notification.status,
                        notification.type,
                        notification.createdDate,
                        notification.message
                ))
                .from(notification)
                .where(
                        notification.receiver.userId.eq(userId),
                        notification.type.ne(NotiType.UPLOAD),
                        notification.status.ne(NotiStatus.DONE)
                )
                .orderBy(notification.createdDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        List<NotiDto> content = results.getResults();
        long total = results.getTotal();
        return new PageImpl<>(content,pageable,total);
    }
}
