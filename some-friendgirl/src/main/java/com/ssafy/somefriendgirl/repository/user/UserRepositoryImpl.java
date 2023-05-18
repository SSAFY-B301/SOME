package com.ssafy.somefriendgirl.repository.user;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.ssafy.somefriendgirl.entity.QUser.user;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public long modifyPhotoLikeList(String userId, String photoLikeList) {
        return queryFactory
                .update(user)
                .set(user.userLikePhotos, photoLikeList)
                .where(user.userId.eq(userId))
                .execute();
    }
}
