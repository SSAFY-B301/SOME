package com.ssafy.somefriendboy.repository.albumfav;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somefriendboy.entity.status.LikeStatus;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.ssafy.somefriendboy.entity.QAlbumFav.albumFav;

@RequiredArgsConstructor
public class AlbumFavRepositoryImpl implements AlbumFavRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public long updateAlbumFavStatus(String userId, long albumId, LikeStatus likeStatus) {
        return queryFactory
                .update(albumFav)
                .set(albumFav.likeStatus, likeStatus)
                .where(albumFav.albumMemberId.albumId.eq(albumId).and(albumFav.albumMemberId.userId.eq(userId)))
                .execute();
    }

    @Override
    public List<Long> getMyFavAlbumIdList(String userId) {
        return queryFactory
                .select(albumFav.albumMemberId.albumId)
                .from(albumFav)
                .where(albumFav.albumMemberId.userId.eq(userId).and(albumFav.likeStatus.eq(LikeStatus.LIKE)))
                .fetch();
    }
}
