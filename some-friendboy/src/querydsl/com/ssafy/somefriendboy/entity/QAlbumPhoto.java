package com.ssafy.somefriendboy.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAlbumPhoto is a Querydsl query type for AlbumPhoto
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAlbumPhoto extends EntityPathBase<AlbumPhoto> {

    private static final long serialVersionUID = 820250899L;

    public static final QAlbumPhoto albumPhoto = new QAlbumPhoto("albumPhoto");

    public final NumberPath<Long> albumId = createNumber("albumId", Long.class);

    public final ListPath<Long, NumberPath<Long>> categoryId = this.<Long, NumberPath<Long>>createList("categoryId", Long.class, NumberPath.class, PathInits.DIRECT2);

    public final NumberPath<Double> gpsLatitude = createNumber("gpsLatitude", Double.class);

    public final NumberPath<Double> gpsLongitude = createNumber("gpsLongitude", Double.class);

    public final NumberPath<Long> likeCnt = createNumber("likeCnt", Long.class);

    public final NumberPath<Double> mapLatitude = createNumber("mapLatitude", Double.class);

    public final NumberPath<Double> mapLongitude = createNumber("mapLongitude", Double.class);

    public final StringPath originUrl = createString("originUrl");

    public final NumberPath<Long> photoId = createNumber("photoId", Long.class);

    public final StringPath resizeUrl = createString("resizeUrl");

    public final DateTimePath<java.util.Date> shootDate = createDateTime("shootDate", java.util.Date.class);

    public final EnumPath<com.ssafy.somefriendboy.entity.status.PhotoStatus> status = createEnum("status", com.ssafy.somefriendboy.entity.status.PhotoStatus.class);

    public final DateTimePath<java.time.LocalDateTime> uploadedDate = createDateTime("uploadedDate", java.time.LocalDateTime.class);

    public final StringPath userId = createString("userId");

    public final NumberPath<Long> viewCnt = createNumber("viewCnt", Long.class);

    public QAlbumPhoto(String variable) {
        super(AlbumPhoto.class, forVariable(variable));
    }

    public QAlbumPhoto(Path<? extends AlbumPhoto> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAlbumPhoto(PathMetadata metadata) {
        super(AlbumPhoto.class, metadata);
    }

}

