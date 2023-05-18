package com.ssafy.somenoti.repository.photocategory;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.ssafy.somenoti.entity.QPhotoCategory.photoCategory;

@RequiredArgsConstructor
public class PhotoCategoryRepositoryImpl implements PhotoCategoryRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Long> findCategoryName(List<String> categoryName) {
        return queryFactory.select(photoCategory.categoryId).from(photoCategory)
                .where(photoCategory.categoryName.in(categoryName)).fetch();
    }
}
