package com.ssafy.somefriendboy.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAlbum is a Querydsl query type for Album
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAlbum extends EntityPathBase<Album> {

    private static final long serialVersionUID = 2073667679L;

    public static final QAlbum album = new QAlbum("album");

    public final NumberPath<Long> albumId = createNumber("albumId", Long.class);

    public final StringPath albumName = createString("albumName");

    public final DateTimePath<java.time.LocalDateTime> createdDate = createDateTime("createdDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> recentPhoto = createNumber("recentPhoto", Long.class);

    public final EnumPath<com.ssafy.somefriendboy.entity.status.AlbumStatus> status = createEnum("status", com.ssafy.somefriendboy.entity.status.AlbumStatus.class);

    public final NumberPath<Long> thumbnailPhoto = createNumber("thumbnailPhoto", Long.class);

    public QAlbum(String variable) {
        super(Album.class, forVariable(variable));
    }

    public QAlbum(Path<? extends Album> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAlbum(PathMetadata metadata) {
        super(Album.class, metadata);
    }

}

