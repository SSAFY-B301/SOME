package com.ssafy.somefriendboy.repository.noti;

import com.querydsl.jpa.impl.JPAQueryFactory;

import com.ssafy.somefriendboy.entity.QNotification;
import com.ssafy.somefriendboy.entity.status.NotiStatus;
import com.ssafy.somefriendboy.entity.status.NotiType;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.ssafy.somefriendboy.entity.QNotification.notification;


@RequiredArgsConstructor
public class NotificationRepositoryImpl implements NotificationRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Long> findPhotoIdNotChecked(String userId) {
        return queryFactory.select(notification.albumOrPhotoId)
                .from(notification)
                .where(
                        notification.receiver.userId.eq(userId),
                        notification.type.eq(NotiType.UPLOAD),
                        notification.status.eq(NotiStatus.UNCHECKED)
                )
                .fetch();
    }
}
