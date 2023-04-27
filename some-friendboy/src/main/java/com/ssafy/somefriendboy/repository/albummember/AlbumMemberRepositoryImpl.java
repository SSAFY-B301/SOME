package com.ssafy.somefriendboy.repository.albummember;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somefriendboy.entity.QAlbumMember;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.ssafy.somefriendboy.entity.QAlbumMember.*;


@RequiredArgsConstructor
public class AlbumMemberRepositoryImpl implements AlbumMemberRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Long> findMyAlbumIdList(String userId) {
        return queryFactory
                .select(albumMember.albumMemberId.albumId)
                .from(albumMember)
                .where(albumMember.albumMemberId.userId.eq("userId"))
                .fetch();
    }
}
