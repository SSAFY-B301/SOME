package com.ssafy.somenoti.repository.album;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somenoti.entity.QAlbum;
import lombok.RequiredArgsConstructor;

import static com.ssafy.somenoti.entity.QAlbum.album;


@RequiredArgsConstructor
public class AlbumRepositoryImpl implements AlbumRepositoryCustom{

    private final JPAQueryFactory queryFactory;


    @Override
    public String findAlbumNameByAlbumId(Long id) {
        return queryFactory
                .select(album.albumName)
                .from(album)
                .where(album.albumId.eq(id))
                .fetchOne();
    }
}
