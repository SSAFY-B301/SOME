package com.ssafy.somefriendboy.repository.albumphotosns;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somefriendboy.entity.AlbumPhotoSNS;
import com.ssafy.somefriendboy.entity.QAlbumPhotoSNS;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.ssafy.somefriendboy.entity.QAlbumPhotoSNS.albumPhotoSNS;

@RequiredArgsConstructor
public class AlbumPhotoSNSRepositoryImpl implements AlbumPhotoSNSRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<AlbumPhotoSNS> findByPhotoId(Long photoId) {
        return queryFactory
                .select(albumPhotoSNS)
                .from(albumPhotoSNS)
                .where(albumPhotoSNS.albumPhotoSnsId.photoId.eq(photoId))
                .fetch();
    }
}
