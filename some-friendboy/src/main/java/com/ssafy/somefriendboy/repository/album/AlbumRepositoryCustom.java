package com.ssafy.somefriendboy.repository.album;

import com.ssafy.somefriendboy.dto.AlbumWholeListDto;
import com.ssafy.somefriendboy.entity.Album;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AlbumRepositoryCustom {

    long modifyAlbumName(Long albumId, String newName);
    long modifyAlbumThumbnail(Long albumId, Long photoId);
    long modifyAlbumRecentPhoto(Long albumId, Long photoId);
//    Page<AlbumWholeListDto> pageAlbumWholeListDto(List<Long> myAlbumIdList, Pageable pageable);
}
