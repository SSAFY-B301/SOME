package com.ssafy.somefriendboy.repository.albumphoto;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.somefriendboy.dto.AlbumPhotoListDto;
import com.ssafy.somefriendboy.entity.AlbumPhoto;
import com.ssafy.somefriendboy.entity.PhotoStatus;
import com.ssafy.somefriendboy.util.MongoQueryUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.somefriendboy.entity.QAlbumPhoto.albumPhoto;
import static com.ssafy.somefriendboy.entity.QPhotoCategory.photoCategory;

@RequiredArgsConstructor
public class AlbumPhotoRepositoryImpl implements AlbumPhotoRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final MongoTemplate mongoTemplate;

    @Override
    public Page<AlbumPhotoListDto> findAlbumPhoto(Long albumId, Long categoryId, List<String> userId, Pageable pageable) {
        Query query = new Query().with(pageable);
        query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.albumId)).is(albumId));
        query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.status)).is(PhotoStatus.NORMAL));
        if (categoryId != null) query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.categoryId)).in(categoryId));
        if (userId != null && userId.size() != 0) query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.userId)).in(userId));
        List<AlbumPhoto> albumPhotos = mongoTemplate.find(query, AlbumPhoto.class);
        List<AlbumPhotoListDto> albumPhotoListDtos = albumPhotos.stream()
                .map(AlbumPhotoListDto::new).collect(Collectors.toList());

        return PageableExecutionUtils.getPage(albumPhotoListDtos, pageable,
                () -> mongoTemplate.count(Query.of(query).limit(-1).skip(-1), AlbumPhotoListDto.class));
    }

    @Override
    public List<Long> findCategoryName(List<String> categoryName) {
        return queryFactory.select(photoCategory.categoryId).from(photoCategory)
                .where(photoCategory.categoryName.in(categoryName)).fetch();
    }

    @Override
    public void modifyPhotoStatus(List<Long> photoId) {
        Query query = new Query(Criteria.where(MongoQueryUtil.parse(albumPhoto.photoId)).in(photoId));
        Update update = Update.update(MongoQueryUtil.parse(albumPhoto.status), PhotoStatus.DELETED);
        mongoTemplate.updateMulti(query, update, AlbumPhoto.class);
    }

    private BooleanExpression categoryIdEq(Long categoryId) {
        return categoryId == null ? null : albumPhoto.categoryId.contains(categoryId);
    }

}
