package com.ssafy.somefriendboy.repository.albumphoto;

import com.ssafy.somefriendboy.dto.AlbumPhotoListDto;
import com.ssafy.somefriendboy.entity.AlbumPhoto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AlbumPhotoRepositoryCustom {
    Page<AlbumPhoto> findAlbumPhoto(Long albumId, Long categoryId, List<String> userId, Pageable pageable);
    List<AlbumPhoto> findAllAlbumPhoto(Long albumId, Long categoryId, List<String> userId);
    List<Long> findCategoryName(List<String> categoryName);
    void modifyPhotoStatus(List<Long> photoId);

    Long countFriendGirlPhotos(String userId);
}
