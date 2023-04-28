package com.ssafy.somefriendboy.repository.AlbumPhoto;

import com.ssafy.somefriendboy.entity.AlbumPhoto;

import java.util.List;

public interface AlbumPhotoRepositoryCustom {
    List<AlbumPhoto> findAlbumCategoryPhoto(Long albumId, Long categoryId);
}
