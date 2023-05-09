package com.ssafy.somefriendboy.repository.albummember;

import com.ssafy.somefriendboy.entity.status.AlbumMemberStatus;

import java.util.List;

public interface AlbumMemberRepositoryCustom {

    List<Long> findMyAlbumIdListByUserId(String userId, AlbumMemberStatus albumMemberStatus);
    List<String> findAlbumMemberIdByAlbumId(Long albumId);
    long acceptInvitedAlbumStatus(Long albumId, String userId);
    long declineInvitedAlbumStatus(Long albumId, String userId);
}
