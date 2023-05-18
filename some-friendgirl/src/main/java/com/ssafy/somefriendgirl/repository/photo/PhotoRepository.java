package com.ssafy.somefriendgirl.repository.photo;

import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends MongoRepository<AlbumPhoto, String>, PhotoRepositoryCustom {
    AlbumPhoto findByPhotoId(Long photoId);
}
