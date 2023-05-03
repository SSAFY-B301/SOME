package com.ssafy.somefriendboy.repository.album;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somefriendboy.dto.AlbumWholeListDto;
import com.ssafy.somefriendboy.dto.QAlbumWholeListDto;
import com.ssafy.somefriendboy.entity.Album;
import com.ssafy.somefriendboy.entity.LikeStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static com.ssafy.somefriendboy.entity.QAlbum.album;
import static com.ssafy.somefriendboy.entity.QAlbumFav.albumFav;
import static com.ssafy.somefriendboy.entity.QAlbumPhoto.albumPhoto;

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
    public Page<AlbumWholeListDto> pageAlbumWholeListDto(List<Long> myAlbumIdList, Pageable pageable) {
        List<AlbumWholeListDto> result = queryFactory
                .select(new QAlbumWholeListDto(
                        album.albumId,
                        album.albumName,
                        album.createdDate,
                        albumPhoto.s3Url,
                        album.recentPhoto,
                        albumFav
                ))
                .from(album)
                .where()
                .fetch();

        return null;
    }

}
