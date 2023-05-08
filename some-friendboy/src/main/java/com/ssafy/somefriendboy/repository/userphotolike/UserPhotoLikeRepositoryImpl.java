package com.ssafy.somefriendboy.repository.userphotolike;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somefriendboy.entity.LikeStatus;
import com.ssafy.somefriendboy.entity.UserPhotoLike;
import lombok.RequiredArgsConstructor;

import static com.ssafy.somefriendboy.entity.QUserPhotoLike.userPhotoLike;

@RequiredArgsConstructor
public class UserPhotoLikeRepositoryImpl implements UserPhotoLikeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public UserPhotoLike findUserPhotoLike(String userId, Long photoId) {
        return queryFactory.select(userPhotoLike).from(userPhotoLike)
                .where(userPhotoLike.userPhotoLikeId.userId.eq(userId),
                        userPhotoLike.userPhotoLikeId.photoId.eq(photoId)).fetchOne();
    }

    @Override
    public long modifyUserPhotoLike(String userId, Long photoId, LikeStatus status) {
        return queryFactory.update(userPhotoLike)
                .set(userPhotoLike.userPhotoLikeStatus, status)
                .where(userPhotoLike.userPhotoLikeId.userId.eq(userId),
                        userPhotoLike.userPhotoLikeId.photoId.eq(photoId)).execute();
    }

}
