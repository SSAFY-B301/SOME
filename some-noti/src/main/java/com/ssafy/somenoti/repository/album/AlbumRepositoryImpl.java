package com.ssafy.somenoti.repository.album;


import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class AlbumRepositoryImpl implements AlbumRepositoryCustom{

    private final JPAQueryFactory queryFactory;


}
