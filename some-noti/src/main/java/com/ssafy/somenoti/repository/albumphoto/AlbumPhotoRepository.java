package com.ssafy.somenoti.repository.albumphoto;

import com.ssafy.somenoti.entity.AlbumPhoto;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AlbumPhotoRepository extends MongoRepository<AlbumPhoto, String> {
    List<AlbumPhoto> findByPhotoIdIn(List<Long> photoId);
}
