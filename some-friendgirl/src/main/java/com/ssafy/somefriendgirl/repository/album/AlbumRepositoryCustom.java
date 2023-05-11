package com.ssafy.somefriendgirl.repository.album;

import com.ssafy.somefriendgirl.dto.GpsRangeDto;
import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AlbumRepositoryCustom {
    List<AlbumPhoto> findAllAlbumPhoto(GpsRangeDto gpsRangeDto);
    List<String> findUserIdAlbumPhoto(GpsRangeDto gpsRangeDto);
    List<AlbumPhoto> findAllAlbumPhotoLikeCnt(GpsRangeDto gpsRangeDto);
    Page<AlbumPhoto> findAlbumPhotoList(GpsRangeDto gpsRangeDto, String sort, Pageable pageable);
}
