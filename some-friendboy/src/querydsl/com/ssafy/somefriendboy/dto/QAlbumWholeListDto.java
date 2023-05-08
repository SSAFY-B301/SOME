package com.ssafy.somefriendboy.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.ssafy.somefriendboy.dto.QAlbumWholeListDto is a Querydsl Projection type for AlbumWholeListDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QAlbumWholeListDto extends ConstructorExpression<AlbumWholeListDto> {

    private static final long serialVersionUID = -297831729L;

    public QAlbumWholeListDto(com.querydsl.core.types.Expression<Long> albumId, com.querydsl.core.types.Expression<String> albumName, com.querydsl.core.types.Expression<java.time.LocalDateTime> albumCreatedDate, com.querydsl.core.types.Expression<Long> recentPhotoId) {
        super(AlbumWholeListDto.class, new Class<?>[]{long.class, String.class, java.time.LocalDateTime.class, long.class}, albumId, albumName, albumCreatedDate, recentPhotoId);
    }

}

