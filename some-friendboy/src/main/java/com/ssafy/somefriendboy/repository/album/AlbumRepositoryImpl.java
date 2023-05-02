package com.ssafy.somefriendboy.repository.album;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somefriendboy.dto.AlbumWholeListDto;
import com.ssafy.somefriendboy.entity.Album;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.ssafy.somefriendboy.entity.QAlbum.album;

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

}
