package com.ssafy.somefriendboy.repository.album;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somefriendboy.entity.Album;
import com.ssafy.somefriendboy.entity.QAlbum;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.ssafy.somefriendboy.entity.QAlbum.album;

@RequiredArgsConstructor
public class AlbumRepositoryImpl implements AlbumRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Album> findWholeAlbum() {
        return queryFactory
                .select(album)
                .from(album)
                .where(album.albumName.eq("yeahsangmin"))
                .fetch();
    }
}
