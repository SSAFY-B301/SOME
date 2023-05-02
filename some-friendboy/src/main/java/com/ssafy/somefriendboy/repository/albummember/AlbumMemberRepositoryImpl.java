package com.ssafy.somefriendboy.repository.albummember;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somefriendboy.entity.AlbumMemberStatus;
import com.ssafy.somefriendboy.entity.QAlbumMember;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.ssafy.somefriendboy.entity.QAlbumMember.*;


@RequiredArgsConstructor
public class AlbumMemberRepositoryImpl implements AlbumMemberRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Long> findMyAlbumIdListByUserId(String userId, AlbumMemberStatus albumMemberStatus) {
        return queryFactory
                .select(albumMember.albumMemberId.albumId)
                .from(albumMember)
                .where(albumMember.albumMemberId.userId.eq(userId).and(albumMember.albumMemberStatus.eq(albumMemberStatus)))
                .fetch();
    }

    @Override
    public List<String> findAlbumMemberIdByAlbumId(Long albumId) {
        return queryFactory
                .select(albumMember.albumMemberId.userId)
                .from(albumMember)
                .where(albumMember.albumMemberId.albumId.eq(albumId).and(albumMember.albumMemberStatus.eq(AlbumMemberStatus.ACCEPT)))
                .fetch();
    }

    @Override
    public long acceptInvitedAlbumStatus(Long albumId, String userId) {
        return queryFactory
                .update(albumMember)
                .set(albumMember.albumMemberStatus, AlbumMemberStatus.ACCEPT)
                .where(albumMember.albumMemberId.albumId.eq(albumId).and(albumMember.albumMemberId.userId.eq(userId)))
                .execute();
    }

    @Override
    public long declineInvitedAlbumStatus(Long albumId, String userId) {
        return queryFactory
                .update(albumMember)
                .set(albumMember.albumMemberStatus, AlbumMemberStatus.DECLINE)
                .where(albumMember.albumMemberId.albumId.eq(albumId).and(albumMember.albumMemberId.userId.eq(userId)))
                .execute();
    }
}
