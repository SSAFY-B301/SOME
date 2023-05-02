package com.ssafy.somefriendboy.repository.albumFav;

import com.ssafy.somefriendboy.entity.AlbumFav;
import com.ssafy.somefriendboy.entity.AlbumMemberStatus;
import com.ssafy.somefriendboy.entity.LikeStatus;

import java.util.List;

public interface AlbumFavRepositoryCustom {

    long updateAlbumFavStatus(String userId, long albumId, LikeStatus likeStatus);
    List<Long> getMyFavAlbumIdList(String userId);
}
