package com.ssafy.somefriendboy.repository.AlbumPhoto;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somefriendboy.entity.AlbumPhoto;
import com.ssafy.somefriendboy.util.MongoQueryUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

import static com.ssafy.somefriendboy.entity.QAlbumPhoto.albumPhoto;

@RequiredArgsConstructor
public class AlbumPhotoRepositoryImpl implements AlbumPhotoRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final MongoTemplate mongoTemplate;

    @Override
    public List<AlbumPhoto> findAlbumCategoryPhoto(Long albumId, Long categoryId) {
        Query query = new Query();
        query.addCriteria(new Criteria().andOperator(Criteria.where(MongoQueryUtil.parse(albumPhoto.albumId)).is(albumId),
                new Criteria().orOperator(Criteria.where(MongoQueryUtil.parse(albumPhoto.categoryId)).in(categoryId))));
        return mongoTemplate.find(query, AlbumPhoto.class);
    }

    private BooleanExpression categoryIdEq(Long categoryId) {
        return categoryId == null ? null : albumPhoto.categoryId.contains(categoryId);
    }

}
