package com.ssafy.somefriendgirl.repository.album;

import com.ssafy.somefriendgirl.dto.GpsRangeDto;
import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import com.ssafy.somefriendgirl.util.MongoQueryUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.ssafy.somefriendgirl.entity.QAlbumPhoto.albumPhoto;

@RequiredArgsConstructor
public class AlbumRepositoryImpl implements AlbumRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    @Override
    public List<AlbumPhoto> findAllAlbumPhoto(GpsRangeDto gpsRangeDto) {
        Query query = new Query();
        query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.mapLatitude)).gte(gpsRangeDto.getStartLat()).lt(gpsRangeDto.getEndLat()));
        query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.mapLongitude)).gte(gpsRangeDto.getStartLon()).lt(gpsRangeDto.getEndLon()));
        return mongoTemplate.find(query, AlbumPhoto.class);
    }

    @Override
    public List<AlbumPhoto> findTop4AlbumPhotoLikeCnt(GpsRangeDto gpsRangeDto) {
        Query query = new Query().with(Sort.by(Sort.Direction.DESC, MongoQueryUtil.parse(albumPhoto.likeCnt))).limit(4);
        query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.mapLatitude)).gte(gpsRangeDto.getStartLat()).lt(gpsRangeDto.getEndLat()));
        query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.mapLongitude)).gte(gpsRangeDto.getStartLon()).lt(gpsRangeDto.getEndLon()));
        return mongoTemplate.find(query, AlbumPhoto.class);
    }

    @Override
    public Page<AlbumPhoto> findAlbumPhotoLikeCnt(GpsRangeDto gpsRangeDto, Pageable pageable) {
        Query query = new Query().with(pageable).with(Sort.by(Sort.Direction.DESC, MongoQueryUtil.parse(albumPhoto.likeCnt)));
        query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.mapLatitude)).gte(gpsRangeDto.getStartLat()).lt(gpsRangeDto.getEndLat()));
        query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.mapLongitude)).gte(gpsRangeDto.getStartLon()).lt(gpsRangeDto.getEndLon()));
        List<AlbumPhoto> albumPhotos = mongoTemplate.find(query, AlbumPhoto.class);

        return PageableExecutionUtils.getPage(albumPhotos, pageable,
                () -> mongoTemplate.count(Query.of(query).limit(-1).skip(-1), AlbumPhoto.class));
    }

    @Override
    public Page<AlbumPhoto> findAlbumPhotoPhotoId(GpsRangeDto gpsRangeDto, Pageable pageable) {
        Query query = new Query().with(pageable).with(Sort.by(Sort.Direction.DESC, MongoQueryUtil.parse(albumPhoto.photoId)));
        query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.mapLatitude)).gte(gpsRangeDto.getStartLat()).lt(gpsRangeDto.getEndLat()));
        query.addCriteria(Criteria.where(MongoQueryUtil.parse(albumPhoto.mapLongitude)).gte(gpsRangeDto.getStartLon()).lt(gpsRangeDto.getEndLon()));
        List<AlbumPhoto> albumPhotos = mongoTemplate.find(query, AlbumPhoto.class);

        return PageableExecutionUtils.getPage(albumPhotos, pageable,
                () -> mongoTemplate.count(Query.of(query).limit(-1).skip(-1), AlbumPhoto.class));
    }

}
