package com.ssafy.somefriendgirl.repository.album;

import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlbumRepository extends MongoRepository<AlbumPhoto, String>, AlbumRepositoryCustom {
}
