package com.ssafy.somenoti.repository.albummember;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somenoti.entity.AlbumMemberStatus;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.ssafy.somenoti.entity.QAlbumMember.*;


@RequiredArgsConstructor
public class AlbumMemberRepositoryImpl implements AlbumMemberRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Long> findMyAlbumIdListByUserId(String userId, AlbumMemberStatus albumMemberStatus) {
        return queryFactory
                .select(albumMember.albumMemberId.albumId)
                .from(albumMember)
                .where(albumMember.albumMemberId.userId.eq(userId).and(albumMember.albumMemberId.albumMemberStatus.eq(albumMemberStatus)))
                .fetch();
    }

    @Override
    public List<String> findAlbumMemberIdByAlbumId(Long albumId,String sender) {
        return queryFactory
                .select(albumMember.albumMemberId.userId)
                .from(albumMember)
                .where(
                        albumMember.albumMemberId.albumId.eq(albumId)
                        .and(albumMember.albumMemberId.albumMemberStatus.eq(AlbumMemberStatus.ACCEPT))
                                .and(albumMember.albumMemberId.userId.ne(sender))
                )
                .fetch();
    }

    @Override
    public long acceptInvitedAlbumStatus(Long albumId, String userId) {
        return queryFactory
                .update(albumMember)
                .set(albumMember.albumMemberId.albumMemberStatus, AlbumMemberStatus.ACCEPT)
                .where(albumMember.albumMemberId.albumId.eq(albumId).and(albumMember.albumMemberId.userId.eq(userId)))
                .execute();
    }

    @Override
    public long declineInvitedAlbumStatus(Long albumId, String userId) {
        return queryFactory
                .update(albumMember)
                .set(albumMember.albumMemberId.albumMemberStatus, AlbumMemberStatus.DECLINE)
                .where(albumMember.albumMemberId.albumId.eq(albumId).and(albumMember.albumMemberId.userId.eq(userId)))
                .execute();
    }
}
