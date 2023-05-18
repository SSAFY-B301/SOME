package com.ssafy.somefriendboy.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QFeedBack is a Querydsl query type for FeedBack
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFeedBack extends EntityPathBase<FeedBack> {

    private static final long serialVersionUID = 394768309L;

    public static final QFeedBack feedBack = new QFeedBack("feedBack");

    public final StringPath content = createString("content");

    public final NumberPath<Long> FeedBackId = createNumber("FeedBackId", Long.class);

    public final StringPath writer = createString("writer");

    public QFeedBack(String variable) {
        super(FeedBack.class, forVariable(variable));
    }

    public QFeedBack(Path<? extends FeedBack> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFeedBack(PathMetadata metadata) {
        super(FeedBack.class, metadata);
    }

}

