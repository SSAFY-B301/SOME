package com.ssafy.somefriendboy.entity.id;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAlbumMemberId is a Querydsl query type for AlbumMemberId
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QAlbumMemberId extends BeanPath<AlbumMemberId> {

    private static final long serialVersionUID = -1573764831L;

    public static final QAlbumMemberId albumMemberId = new QAlbumMemberId("albumMemberId");

    public final NumberPath<Long> albumId = createNumber("albumId", Long.class);

    public final StringPath userId = createString("userId");

    public QAlbumMemberId(String variable) {
        super(AlbumMemberId.class, forVariable(variable));
    }

    public QAlbumMemberId(Path<? extends AlbumMemberId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAlbumMemberId(PathMetadata metadata) {
        super(AlbumMemberId.class, metadata);
    }

}

