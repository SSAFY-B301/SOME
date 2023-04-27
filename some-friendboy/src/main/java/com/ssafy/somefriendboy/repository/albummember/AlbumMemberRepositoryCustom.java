package com.ssafy.somefriendboy.repository.albummember;

import java.util.List;

public interface AlbumMemberRepositoryCustom {
    List<Long> findMyAlbumIdList(String userId);
}
