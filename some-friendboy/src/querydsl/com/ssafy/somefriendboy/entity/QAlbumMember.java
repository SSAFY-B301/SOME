package com.ssafy.somefriendboy.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAlbumMember is a Querydsl query type for AlbumMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAlbumMember extends EntityPathBase<AlbumMember> {

    private static final long serialVersionUID = -430760999L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAlbumMember albumMember = new QAlbumMember("albumMember");

    public final com.ssafy.somefriendboy.entity.id.QAlbumMemberId albumMemberId;

    public final EnumPath<com.ssafy.somefriendboy.entity.status.AlbumMemberStatus> albumMemberStatus = createEnum("albumMemberStatus", com.ssafy.somefriendboy.entity.status.AlbumMemberStatus.class);

    public QAlbumMember(String variable) {
        this(AlbumMember.class, forVariable(variable), INITS);
    }

    public QAlbumMember(Path<? extends AlbumMember> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAlbumMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAlbumMember(PathMetadata metadata, PathInits inits) {
        this(AlbumMember.class, metadata, inits);
    }

    public QAlbumMember(Class<? extends AlbumMember> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.albumMemberId = inits.isInitialized("albumMemberId") ? new com.ssafy.somefriendboy.entity.id.QAlbumMemberId(forProperty("albumMemberId")) : null;
    }

}

