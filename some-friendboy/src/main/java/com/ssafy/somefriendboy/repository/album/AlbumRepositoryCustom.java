package com.ssafy.somefriendboy.repository.album;

import com.ssafy.somefriendboy.entity.Album;

import java.util.List;

public interface AlbumRepositoryCustom {

    long modifyAlbumName(Long albumId, String newName);
    long modifyAlbumRecentPhoto(Long albumId, Long photoId);

}
