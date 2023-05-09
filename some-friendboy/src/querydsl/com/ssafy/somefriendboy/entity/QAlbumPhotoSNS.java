package com.ssafy.somefriendboy.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAlbumPhotoSNS is a Querydsl query type for AlbumPhotoSNS
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAlbumPhotoSNS extends EntityPathBase<AlbumPhotoSNS> {

    private static final long serialVersionUID = 2025667429L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAlbumPhotoSNS albumPhotoSNS = new QAlbumPhotoSNS("albumPhotoSNS");

    public final com.ssafy.somefriendboy.entity.id.QAlbumPhotoSnsId albumPhotoSnsId;

    public final EnumPath<com.ssafy.somefriendboy.entity.status.AlbumPhotoSnsStatus> status = createEnum("status", com.ssafy.somefriendboy.entity.status.AlbumPhotoSnsStatus.class);

    public QAlbumPhotoSNS(String variable) {
        this(AlbumPhotoSNS.class, forVariable(variable), INITS);
    }

    public QAlbumPhotoSNS(Path<? extends AlbumPhotoSNS> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAlbumPhotoSNS(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAlbumPhotoSNS(PathMetadata metadata, PathInits inits) {
        this(AlbumPhotoSNS.class, metadata, inits);
    }

    public QAlbumPhotoSNS(Class<? extends AlbumPhotoSNS> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.albumPhotoSnsId = inits.isInitialized("albumPhotoSnsId") ? new com.ssafy.somefriendboy.entity.id.QAlbumPhotoSnsId(forProperty("albumPhotoSnsId")) : null;
    }

}

