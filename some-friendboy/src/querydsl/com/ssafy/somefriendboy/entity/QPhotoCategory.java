package com.ssafy.somefriendboy.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPhotoCategory is a Querydsl query type for PhotoCategory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPhotoCategory extends EntityPathBase<PhotoCategory> {

    private static final long serialVersionUID = 1719093056L;

    public static final QPhotoCategory photoCategory = new QPhotoCategory("photoCategory");

    public final NumberPath<Long> categoryId = createNumber("categoryId", Long.class);

    public final StringPath categoryName = createString("categoryName");

    public QPhotoCategory(String variable) {
        super(PhotoCategory.class, forVariable(variable));
    }

    public QPhotoCategory(Path<? extends PhotoCategory> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPhotoCategory(PathMetadata metadata) {
        super(PhotoCategory.class, metadata);
    }

}

