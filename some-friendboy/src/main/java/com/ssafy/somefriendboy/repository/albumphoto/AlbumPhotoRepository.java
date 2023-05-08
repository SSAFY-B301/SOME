package com.ssafy.somefriendboy.repository.albumphoto;

import com.ssafy.somefriendboy.entity.AlbumPhoto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlbumPhotoRepository extends MongoRepository<AlbumPhoto, String>, AlbumPhotoRepositoryCustom {
    AlbumPhoto findByPhotoId(Long photoId);
}