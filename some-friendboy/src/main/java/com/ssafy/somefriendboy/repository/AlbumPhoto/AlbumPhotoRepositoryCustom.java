package com.ssafy.somefriendboy.repository.AlbumPhoto;

import com.ssafy.somefriendboy.entity.AlbumPhoto;

import java.util.List;

public interface AlbumPhotoRepositoryCustom {
    List<AlbumPhoto> findAlbumPhoto(Long albumId, Long categoryId, List<String> userId);
    List<Long> findCategoryName(List<String> categoryName);
    void modifyPhotoStatus(List<Long> photoId);
}
