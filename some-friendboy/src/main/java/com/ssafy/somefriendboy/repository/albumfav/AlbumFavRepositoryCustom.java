package com.ssafy.somefriendboy.repository.albumfav;

import com.ssafy.somefriendboy.entity.status.LikeStatus;

import java.util.List;

public interface AlbumFavRepositoryCustom {

    long updateAlbumFavStatus(String userId, long albumId, LikeStatus likeStatus);
    List<Long> getMyFavAlbumIdList(String userId);
}
