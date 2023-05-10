package com.ssafy.somefriendgirl.service;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.GpsDirectory;
import com.ssafy.somefriendgirl.dto.*;
import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import com.ssafy.somefriendgirl.entity.PhotoStatus;
import com.ssafy.somefriendgirl.repository.album.AlbumRepository;
import com.ssafy.somefriendgirl.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final ResponseUtil responseUtil;
    private final Double MAP_LAT_SIZE = 0.005;
    private final Double MAP_LON_SIZE = 0.00035;

    public ResponseDto insertPhoto(List<MultipartFile> multipartFiles, List<MetaDataDto> metaDataDtos, GpsRequestDto gpsRequestDto, String accessToken) throws ImageProcessingException, IOException {
        Map<String, Object> result = new HashMap<>();
        String userId = responseUtil.tokenCheck(accessToken);

        if (userId == null) {
            return responseUtil.setResponseDto(result, "토큰 만료", 450);
        }

        LinkedList<AlbumPhoto> albumPhotos = new LinkedList<>();

        for (int i = 0; i < metaDataDtos.size(); i++) {
            InputStream inputStream = multipartFiles.get(i).getInputStream();
            Metadata metadata = ImageMetadataReader.readMetadata(inputStream);
            inputStream.close();

            AlbumPhoto albumPhoto = AlbumPhoto.builder()
                    .photoId(metaDataDtos.get(i).getPhotoId())
                    .uploadedDate(LocalDateTime.now())
                    .originUrl(metaDataDtos.get(i).getOriginUrl())
                    .resizeUrl(metaDataDtos.get(i).getResizeUrl())
                    .mapLatitude(gpsRequestDto.getLatitude())
                    .mapLongitude(gpsRequestDto.getLongitude())
                    .status(PhotoStatus.NORMAL)
                    .viewCnt(0L).likeCnt(0L)
                    .userId(userId)
                    .build();

            GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);

            if (gpsDirectory != null && gpsDirectory.containsTag(GpsDirectory.TAG_LATITUDE) && gpsDirectory.containsTag(GpsDirectory.TAG_LONGITUDE)) {
                String pdsLat = String.valueOf(gpsDirectory.getGeoLocation().getLatitude());
                String pdsLon = String.valueOf(gpsDirectory.getGeoLocation().getLongitude());
                double lat = Double.parseDouble(pdsLat);
                double lon = Double.parseDouble(pdsLon);

                albumPhoto.setGpsLatitude(lat);
                albumPhoto.setGpsLongitude(lon);
            }

            albumPhotos.add(albumPhoto);
        }

        List<AlbumPhoto> albumPhotoList = albumRepository.insert(albumPhotos);
        List<Long> photoIds = albumPhotoList.stream().map(AlbumPhoto::getPhotoId).collect(Collectors.toList());

        result.put("addPhotoIdList", photoIds);
        return responseUtil.setResponseDto(result, "여사친 사진 등록", 200);
    }

    public ResponseDto selectThumbPhoto(GpsRequestDto gpsRequestDto, String accessToken) {
        Map<String, Object> result = new HashMap<>();
        String userId = responseUtil.tokenCheck(accessToken);

        if (userId == null) {
            return responseUtil.setResponseDto(result, "토큰 만료", 450);
        }

        //전체 지도 위경도 범위
        GpsRangeDto gpsRangeDto = GpsRangeDto.builder().startLat(gpsRequestDto.getLatitude() - MAP_LAT_SIZE / 2).startLon(gpsRequestDto.getLongitude() - MAP_LON_SIZE / 2)
                .endLat(gpsRequestDto.getLatitude() + MAP_LAT_SIZE / 2).endLon(gpsRequestDto.getLongitude() + MAP_LON_SIZE / 2).build();
        log.info("4분할 4사진 목록 GET: /album/upload, gpsRangeDto : {}", gpsRangeDto);
        List<AlbumPhoto> albumPhotos = albumRepository.findAllAlbumPhoto(gpsRangeDto);

        //현재 위치와 4분할 위경도 평균값 계산
        Long[] size = new Long[5];
        GpsDto[] gpsSum = new GpsDto[5];
        GpsDto[] markGps = new GpsDto[5];

        for (int i = 1; i <= 4 ; i++) {
            size[i] = 0L;
            gpsSum[i] = new GpsDto();
            markGps[i] = new GpsDto();
        }

        for (int i = 0; i < albumPhotos.size(); i++) {
            double lat = albumPhotos.get(i).getMapLatitude();
            double lon = albumPhotos.get(i).getMapLongitude();

            //1사분면
            if (gpsRequestDto.getLatitude() <= lat && lat < gpsRangeDto.getEndLat()
                    && gpsRequestDto.getLongitude() <= lon && lon < gpsRangeDto.getEndLon()) {
                gpsSum[1].latitude += lat;
                gpsSum[1].longitude += lon;
                size[1] += 1;
            }

            //2사분면
            else if (gpsRequestDto.getLatitude() <= lat && lat < gpsRangeDto.getEndLat()
                    && gpsRangeDto.getStartLon() <= lon && lon < gpsRequestDto.getLongitude()) {
                gpsSum[2].latitude += lat;
                gpsSum[2].longitude += lon;
                size[2] += 1;
            }

            //3사분면
            else if (gpsRangeDto.getStartLat() <= lat && lat < gpsRequestDto.getLatitude()
                    && gpsRangeDto.getStartLon() <= lon && lon < gpsRequestDto.getLongitude()) {
                gpsSum[3].latitude += lat;
                gpsSum[3].longitude += lon;
                size[3] += 1;
            }

            //4사분면
            else if (gpsRangeDto.getStartLat() <= lat && lat < gpsRequestDto.getLatitude()
                    && gpsRequestDto.getLongitude() <= lon && lon < gpsRangeDto.getEndLon()) {
                gpsSum[4].latitude += lat;
                gpsSum[4].longitude += lon;
                size[4] += 1;
            }
        }

        for (int i = 1; i <= 4; i++) {
            markGps[i].section = i;
            markGps[i].latitude = gpsSum[i].latitude / size[i];
            markGps[i].longitude = gpsSum[i].longitude / size[i];
        }

        //좋아요순 4분할 사진 리스트 반환
        GpsRangeDto gpsRangeDto1 = GpsRangeDto.builder().startLat(gpsRequestDto.getLatitude()).startLon(gpsRequestDto.getLongitude())
                .endLat(gpsRangeDto.getEndLat()).endLon(gpsRangeDto.getEndLon()).build();
        GpsRangeDto gpsRangeDto2 = GpsRangeDto.builder().startLat(gpsRequestDto.getLatitude()).startLon(gpsRangeDto.getStartLon())
                .endLat(gpsRangeDto.getEndLat()).endLon(gpsRequestDto.getLongitude()).build();
        GpsRangeDto gpsRangeDto3 = GpsRangeDto.builder().startLat(gpsRangeDto.getStartLat()).startLon(gpsRangeDto.getStartLon())
                .endLat(gpsRequestDto.getLatitude()).endLon(gpsRequestDto.getLongitude()).build();
        GpsRangeDto gpsRangeDto4 = GpsRangeDto.builder().startLat(gpsRangeDto.getStartLat()).startLon(gpsRequestDto.getLongitude())
                .endLat(gpsRequestDto.getLatitude()).endLon(gpsRangeDto.getEndLon()).build();

        //1사분면
        List<AlbumPhoto> albumPhotos1 = albumRepository.findTop4AlbumPhotoLikeCnt(gpsRangeDto1);
        List<PhotoListDto> photoListDtos1 = albumPhotos1.stream().map(PhotoListDto::new).collect(Collectors.toList());

        HashMap<String, Object> photoList1 = new HashMap<>();
        photoList1.put("PhotoList", photoListDtos1);
        photoList1.put("MarkGps", markGps[1]);

        //2사분면
        List<AlbumPhoto> albumPhotos2 = albumRepository.findTop4AlbumPhotoLikeCnt(gpsRangeDto2);
        List<PhotoListDto> photoListDtos2 = albumPhotos2.stream().map(PhotoListDto::new).collect(Collectors.toList());

        HashMap<String, Object> photoList2 = new HashMap<>();
        photoList2.put("PhotoList", photoListDtos2);
        photoList2.put("MarkGps", markGps[2]);

        //3사분면
        List<AlbumPhoto> albumPhotos3 = albumRepository.findTop4AlbumPhotoLikeCnt(gpsRangeDto3);
        List<PhotoListDto> photoListDtos3 = albumPhotos3.stream().map(PhotoListDto::new).collect(Collectors.toList());

        HashMap<String, Object> photoList3 = new HashMap<>();
        photoList3.put("PhotoList", photoListDtos3);
        photoList3.put("MarkGps", markGps[3]);

        //4사분면
        List<AlbumPhoto> albumPhotos4 = albumRepository.findTop4AlbumPhotoLikeCnt(gpsRangeDto4);
        List<PhotoListDto> photoListDtos4 = albumPhotos4.stream().map(PhotoListDto::new).collect(Collectors.toList());

        HashMap<String, Object> photoList4 = new HashMap<>();
        photoList4.put("PhotoList", photoListDtos4);
        photoList4.put("MarkGps", markGps[4]);

        result.put("PhotoList1", photoList1);
        result.put("PhotoList2", photoList2);
        result.put("PhotoList3", photoList3);
        result.put("PhotoList4", photoList4);

        return responseUtil.setResponseDto(result, "여사친 썸네일 사진 목록", 200);
    }

    public ResponseDto selectLikeCntPhoto(GpsRequestDto gpsRequestDto, Pageable pageable, String accessToken) {
        Map<String, Object> result = new HashMap<>();
        String userId = responseUtil.tokenCheck(accessToken);

        if (userId == null) {
            return responseUtil.setResponseDto(result, "토큰 만료", 450);
        }

        //해당 사분면 지도 위경도 범위
        GpsRangeDto gpsRangeDto = calcGpsRange(gpsRequestDto);

        Page<AlbumPhoto> albumPhotos = albumRepository.findAlbumPhotoLikeCnt(gpsRangeDto, pageable);
        List<PhotoListDto> photoListDtos = albumPhotos.getContent().stream().map(PhotoListDto::new).collect(Collectors.toList());
        PageDto pageDto = PageDto.builder().is_first(albumPhotos.isFirst()).is_last(albumPhotos.isLast())
                .total_page(albumPhotos.getTotalPages()).now_page(albumPhotos.getPageable().getPageNumber()).build();

        result.put("PhotoList", photoListDtos);
        result.put("Page", pageDto);

        return responseUtil.setResponseDto(result, "여사친 좋아요순 사진 목록", 200);
    }

    public ResponseDto selectPhotoIdPhoto(GpsRequestDto gpsRequestDto, Pageable pageable, String accessToken) {
        Map<String, Object> result = new HashMap<>();
        String userId = responseUtil.tokenCheck(accessToken);

        if (userId == null) {
            return responseUtil.setResponseDto(result, "토큰 만료", 450);
        }

        //해당 사분면 지도 위경도 범위
        GpsRangeDto gpsRangeDto = calcGpsRange(gpsRequestDto);

        Page<AlbumPhoto> albumPhotos = albumRepository.findAlbumPhotoPhotoId(gpsRangeDto, pageable);
        List<PhotoListDto> photoListDtos = albumPhotos.getContent().stream().map(PhotoListDto::new).collect(Collectors.toList());
        PageDto pageDto = PageDto.builder().is_first(albumPhotos.isFirst()).is_last(albumPhotos.isLast())
                .total_page(albumPhotos.getTotalPages()).now_page(albumPhotos.getPageable().getPageNumber()).build();

        result.put("PhotoList", photoListDtos);
        result.put("Page", pageDto);

        return responseUtil.setResponseDto(result, "여사친 최신순 사진 목록", 200);
    }

    private GpsRangeDto calcGpsRange(GpsRequestDto gpsRequestDto) {
        GpsRangeDto gpsRangeDto = null;

        switch (gpsRequestDto.getSection()) {
            case 1:
                gpsRangeDto = GpsRangeDto.builder().startLat(gpsRequestDto.getLatitude()).startLon(gpsRequestDto.getLongitude())
                        .endLat(gpsRequestDto.getLatitude() + MAP_LAT_SIZE / 2).endLon(gpsRequestDto.getLongitude() + MAP_LON_SIZE / 2).build();
                break;
            case 2:
                gpsRangeDto = GpsRangeDto.builder().startLat(gpsRequestDto.getLatitude()).startLon(gpsRequestDto.getLongitude() - MAP_LON_SIZE / 2)
                        .endLat(gpsRequestDto.getLatitude() + MAP_LAT_SIZE / 2).endLon(gpsRequestDto.getLongitude()).build();
                break;
            case 3:
                gpsRangeDto = GpsRangeDto.builder().startLat(gpsRequestDto.getLatitude() - MAP_LAT_SIZE / 2).startLon(gpsRequestDto.getLongitude() - MAP_LON_SIZE / 2)
                        .endLat(gpsRequestDto.getLatitude()).endLon(gpsRequestDto.getLongitude()).build();
                break;
            case 4:
                gpsRangeDto = GpsRangeDto.builder().startLat(gpsRequestDto.getLatitude() - MAP_LAT_SIZE / 2).startLon(gpsRequestDto.getLongitude())
                        .endLat(gpsRequestDto.getLatitude()).endLon(gpsRequestDto.getLongitude() + MAP_LON_SIZE / 2).build();
                break;
        }

        return gpsRangeDto;
    }

}
