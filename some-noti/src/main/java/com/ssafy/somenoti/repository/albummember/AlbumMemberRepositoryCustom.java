package com.ssafy.somenoti.repository.albummember;

import com.ssafy.somenoti.entity.AlbumMemberStatus;

import java.util.List;

public interface AlbumMemberRepositoryCustom {

    List<Long> findMyAlbumIdListByUserId(String userId, AlbumMemberStatus albumMemberStatus);
    List<String> findAlbumMemberIdByAlbumId(Long albumId,String sender);
    long acceptInvitedAlbumStatus(Long albumId, String userId);
    long declineInvitedAlbumStatus(Long albumId, String userId);
}
