package com.ssafy.somefriendboy.repository;

import com.ssafy.somefriendboy.entity.AlbumPhoto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlbumPhotoRepository extends MongoRepository<AlbumPhoto, String> {

}
