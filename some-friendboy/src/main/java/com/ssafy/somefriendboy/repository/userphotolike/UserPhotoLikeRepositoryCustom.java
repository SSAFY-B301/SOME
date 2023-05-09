package com.ssafy.somefriendboy.repository.userphotolike;

import com.ssafy.somefriendboy.entity.status.LikeStatus;
import com.ssafy.somefriendboy.entity.UserPhotoLike;

public interface UserPhotoLikeRepositoryCustom {
    UserPhotoLike findUserPhotoLike(String userId, Long photoId);
    long modifyUserPhotoLike(String userId, Long photoId, LikeStatus status);
}
