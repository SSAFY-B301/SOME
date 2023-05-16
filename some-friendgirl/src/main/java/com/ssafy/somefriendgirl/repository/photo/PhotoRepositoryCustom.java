package com.ssafy.somefriendgirl.repository.photo;

public interface PhotoRepositoryCustom {
    void modifyPhotoViewCnt(Long photoId, Long newViewCnt);
    void modifyPhotoLikeCnt(Long photoId, Long newLikeCnt);
}
