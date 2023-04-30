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
import static com.ssafy.somefriendboy.entity.QPhotoCategory.photoCategory;

@RequiredArgsConstructor
public class AlbumPhotoRepositoryImpl implements AlbumPhotoRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final MongoTemplate mongoTemplate;

    @Override
    public List<AlbumPhoto> findAlbumPhoto(Long albumId, Long categoryId, List<String> userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.albumId)).is(albumId));
        if (categoryId != null) query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.categoryId)).in(categoryId));
        if (userId != null && userId.size() != 0) query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.userId)).in(userId));
        return mongoTemplate.find(query, AlbumPhoto.class);
    }

    @Override
    public List<Long> findCategoryName(List<String> categoryName) {
        return queryFactory.select(photoCategory.categoryId).from(photoCategory)
                .where(photoCategory.categoryName.in(categoryName)).fetch();
    }

    private BooleanExpression categoryIdEq(Long categoryId) {
        return categoryId == null ? null : albumPhoto.categoryId.contains(categoryId);
    }

}
