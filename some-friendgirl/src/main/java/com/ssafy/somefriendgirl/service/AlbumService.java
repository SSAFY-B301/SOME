package com.ssafy.somefriendgirl.service;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifSubIFDDirectory;
import com.drew.metadata.exif.GpsDirectory;
import com.ssafy.somefriendgirl.dto.GpsDto;
import com.ssafy.somefriendgirl.dto.MetaDataDto;
import com.ssafy.somefriendgirl.dto.ResponseDto;
import com.ssafy.somefriendgirl.entity.AlbumPhoto;
import com.ssafy.somefriendgirl.entity.PhotoStatus;
import com.ssafy.somefriendgirl.repository.album.AlbumRepository;
import com.ssafy.somefriendgirl.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final ResponseUtil responseUtil;

    public ResponseDto insertPhoto(List<MultipartFile> multipartFiles, List<MetaDataDto> metaDataDtos, GpsDto gpsDto, String accessToken) throws ImageProcessingException, IOException {
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
                    .mapLatitude(gpsDto.getLatitude())
                    .mapLongitude(gpsDto.getLongitude())
                    .status(PhotoStatus.NORMAL)
                    .userId(userId)
                    .build();

            ExifSubIFDDirectory exifSubIFDDirectory = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
            GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);

            if (exifSubIFDDirectory != null && exifSubIFDDirectory.containsTag(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL)) {
                Date date = exifSubIFDDirectory.getDateOriginal();
                albumPhoto.setShootDate(date);
            }

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
        return responseUtil.setResponseDto(result, "앨범 사진 등록", 200);
    }

}
