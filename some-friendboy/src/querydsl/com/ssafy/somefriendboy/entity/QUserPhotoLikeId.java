package com.ssafy.somefriendboy.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserPhotoLikeId is a Querydsl query type for UserPhotoLikeId
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QUserPhotoLikeId extends BeanPath<UserPhotoLikeId> {

    private static final long serialVersionUID = 5171465L;

    public static final QUserPhotoLikeId userPhotoLikeId = new QUserPhotoLikeId("userPhotoLikeId");

    public final NumberPath<Long> photoId = createNumber("photoId", Long.class);

    public final StringPath userId = createString("userId");

    public QUserPhotoLikeId(String variable) {
        super(UserPhotoLikeId.class, forVariable(variable));
    }

    public QUserPhotoLikeId(Path<? extends UserPhotoLikeId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserPhotoLikeId(PathMetadata metadata) {
        super(UserPhotoLikeId.class, metadata);
    }

}

