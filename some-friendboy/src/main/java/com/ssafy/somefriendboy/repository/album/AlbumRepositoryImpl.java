package com.ssafy.somefriendboy.repository.album;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somefriendboy.dto.AlbumWholeListDto;
import com.ssafy.somefriendboy.dto.QAlbumWholeListDto;
import com.ssafy.somefriendboy.entity.status.AlbumMemberStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static com.ssafy.somefriendboy.entity.QAlbum.album;
import static com.ssafy.somefriendboy.entity.QAlbumMember.albumMember;

@RequiredArgsConstructor
public class AlbumRepositoryImpl implements AlbumRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public long modifyAlbumName(Long albumId, String newName) {
        return queryFactory
                .update(album)
                .set(album.albumName, newName)
                .where(album.albumId.eq(albumId))
                .execute();
    }

    @Override
    public long modifyAlbumThumbnail(Long albumId, Long photoId) {
        return queryFactory
                .update(album)
                .set(album.thumbnailPhoto, photoId)
                .where(album.albumId.eq(albumId))
                .execute();
    }

    @Override
    public long modifyAlbumRecentPhoto(Long albumId, Long photoId) {
        return queryFactory
                .update(album)
                .set(album.recentPhoto, photoId)
                .where(album.albumId.eq(albumId))
                .execute();
    }

    @Override
    public Page<AlbumWholeListDto> pageAlbumWholeListDto(String userId, Pageable pageable) {
        QueryResults<AlbumWholeListDto> results = queryFactory
                .select(new QAlbumWholeListDto(
                        album.albumId,
                        album.albumName,
                        album.createdDate,
                        album.recentPhoto
                ))
                .from(album)
                .where(album.albumId.in(JPAExpressions
                        .select(albumMember.albumMemberId.albumId)
                        .from(albumMember)
                        .where(albumMember.albumMemberId.userId.eq(userId)
                                .and(albumMember.albumMemberStatus.eq(AlbumMemberStatus.ACCEPT)))))

                .orderBy(album.recentPhoto.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<AlbumWholeListDto> content = results.getResults();
        long total = results.getTotal();
        return new PageImpl<>(content,pageable,total);
    }

}
