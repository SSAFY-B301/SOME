package com.ssafy.somefriendgirl.repository.album;

import com.ssafy.somefriendgirl.dto.GpsRangeDto;
import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AlbumRepositoryCustom {
    List<AlbumPhoto> findAllAlbumPhoto(GpsRangeDto gpsRangeDto);
    List<AlbumPhoto> findTop4AlbumPhotoLikeCnt(GpsRangeDto gpsRangeDto);
    Page<AlbumPhoto> findAlbumPhotoLikeCnt(GpsRangeDto gpsRangeDto, Pageable pageable);
    Page<AlbumPhoto> findAlbumPhotoPhotoId(GpsRangeDto gpsRangeDto, Pageable pageable);
}
