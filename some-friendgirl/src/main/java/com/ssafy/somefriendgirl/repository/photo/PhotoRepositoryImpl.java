package com.ssafy.somefriendgirl.repository.photo;

import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

@RequiredArgsConstructor
public class PhotoRepositoryImpl implements PhotoRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    @Override
    public void modifyPhotoViewCnt(Long photoId, Long newViewCnt) {
        Query query = new Query(Criteria.where("photoId").is(photoId));
        Update update = Update.update("viewCnt", newViewCnt);
        mongoTemplate.updateFirst(query, update, AlbumPhoto.class);
    }

    @Override
    public void modifyPhotoLikeCnt(Long photoId, Long newLikeCnt) {
        Query query = new Query(Criteria.where("photoId").is(photoId));
        Update update = Update.update("likeCnt", newLikeCnt);
        mongoTemplate.updateFirst(query, update, AlbumPhoto.class);
    }
}
