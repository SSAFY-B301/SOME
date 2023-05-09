package com.ssafy.somefriendgirl.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAutoIncrementSequence is a Querydsl query type for AutoIncrementSequence
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAutoIncrementSequence extends EntityPathBase<AutoIncrementSequence> {

    private static final long serialVersionUID = -923393361L;

    public static final QAutoIncrementSequence autoIncrementSequence = new QAutoIncrementSequence("autoIncrementSequence");

    public final StringPath id = createString("id");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public QAutoIncrementSequence(String variable) {
        super(AutoIncrementSequence.class, forVariable(variable));
    }

    public QAutoIncrementSequence(Path<? extends AutoIncrementSequence> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAutoIncrementSequence(PathMetadata metadata) {
        super(AutoIncrementSequence.class, metadata);
    }

}

