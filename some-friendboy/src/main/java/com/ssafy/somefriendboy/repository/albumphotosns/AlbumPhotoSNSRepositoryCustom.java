package com.ssafy.somefriendboy.repository.albumphotosns;

import com.ssafy.somefriendboy.entity.AlbumPhotoSNS;

import java.util.List;

public interface AlbumPhotoSNSRepositoryCustom {
    List<AlbumPhotoSNS> findByPhotoId(Long photoId);
}
