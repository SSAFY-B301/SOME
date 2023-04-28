package com.ssafy.somefriendboy.repository.AlbumPhoto;

import com.ssafy.somefriendboy.entity.AlbumPhoto;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AlbumPhotoRepository extends MongoRepository<AlbumPhoto, String>, AlbumPhotoRepositoryCustom {
    AlbumPhoto findByPhotoId(Long photoId);
    List<AlbumPhoto> findByAlbumId(Long albumId);
    List<AlbumPhoto> findByAlbumIdAndCategoryId(Long albumId, Long categoryId);
}
