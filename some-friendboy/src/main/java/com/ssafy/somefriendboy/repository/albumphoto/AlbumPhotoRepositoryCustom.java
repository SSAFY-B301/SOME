package com.ssafy.somefriendboy.repository.albumphoto;

import com.ssafy.somefriendboy.dto.AlbumPhotoListDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AlbumPhotoRepositoryCustom {
    Page<AlbumPhotoListDto> findAlbumPhoto(Long albumId, Long categoryId, List<String> userId, Pageable pageable);
    List<Long> findCategoryName(List<String> categoryName);
    void modifyPhotoStatus(List<Long> photoId);
}
