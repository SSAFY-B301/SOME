package com.ssafy.somefriendboy.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAlbumFav is a Querydsl query type for AlbumFav
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAlbumFav extends EntityPathBase<AlbumFav> {

    private static final long serialVersionUID = 2119277116L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAlbumFav albumFav = new QAlbumFav("albumFav");

    public final QAlbumMemberId albumMemberId;

    public final EnumPath<LikeStatus> likeStatus = createEnum("likeStatus", LikeStatus.class);

    public QAlbumFav(String variable) {
        this(AlbumFav.class, forVariable(variable), INITS);
    }

    public QAlbumFav(Path<? extends AlbumFav> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAlbumFav(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAlbumFav(PathMetadata metadata, PathInits inits) {
        this(AlbumFav.class, metadata, inits);
    }

    public QAlbumFav(Class<? extends AlbumFav> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.albumMemberId = inits.isInitialized("albumMemberId") ? new QAlbumMemberId(forProperty("albumMemberId")) : null;
    }

}

