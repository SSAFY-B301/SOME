package com.ssafy.somefriendboy.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserPhotoLike is a Querydsl query type for UserPhotoLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserPhotoLike extends EntityPathBase<UserPhotoLike> {

    private static final long serialVersionUID = -1635746994L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserPhotoLike userPhotoLike = new QUserPhotoLike("userPhotoLike");

    public final com.ssafy.somefriendboy.entity.id.QUserPhotoLikeId userPhotoLikeId;

    public final EnumPath<com.ssafy.somefriendboy.entity.status.LikeStatus> userPhotoLikeStatus = createEnum("userPhotoLikeStatus", com.ssafy.somefriendboy.entity.status.LikeStatus.class);

    public QUserPhotoLike(String variable) {
        this(UserPhotoLike.class, forVariable(variable), INITS);
    }

    public QUserPhotoLike(Path<? extends UserPhotoLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserPhotoLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserPhotoLike(PathMetadata metadata, PathInits inits) {
        this(UserPhotoLike.class, metadata, inits);
    }

    public QUserPhotoLike(Class<? extends UserPhotoLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userPhotoLikeId = inits.isInitialized("userPhotoLikeId") ? new com.ssafy.somefriendboy.entity.id.QUserPhotoLikeId(forProperty("userPhotoLikeId")) : null;
    }

}

