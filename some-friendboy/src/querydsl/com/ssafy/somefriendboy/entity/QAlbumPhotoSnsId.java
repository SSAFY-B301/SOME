package com.ssafy.somefriendboy.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAlbumPhotoSnsId is a Querydsl query type for AlbumPhotoSnsId
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QAlbumPhotoSnsId extends BeanPath<AlbumPhotoSnsId> {

    private static final long serialVersionUID = 1047200608L;

    public static final QAlbumPhotoSnsId albumPhotoSnsId = new QAlbumPhotoSnsId("albumPhotoSnsId");

    public final NumberPath<Long> photoId = createNumber("photoId", Long.class);

    public final StringPath userId = createString("userId");

    public QAlbumPhotoSnsId(String variable) {
        super(AlbumPhotoSnsId.class, forVariable(variable));
    }

    public QAlbumPhotoSnsId(Path<? extends AlbumPhotoSnsId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAlbumPhotoSnsId(PathMetadata metadata) {
        super(AlbumPhotoSnsId.class, metadata);
    }

}

