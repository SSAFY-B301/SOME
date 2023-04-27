package com.ssafy.somefriendboy.repository.album;

import com.ssafy.somefriendboy.entity.Album;

import java.util.List;

public interface AlbumRepositoryCustom {

    List<Album> findWholeAlbum();
}
