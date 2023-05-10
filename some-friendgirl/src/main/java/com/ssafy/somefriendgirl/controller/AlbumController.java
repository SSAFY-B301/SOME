package com.ssafy.somefriendgirl.controller;

import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.MetadataException;
import com.ssafy.somefriendgirl.dto.GpsRequestDto;
import com.ssafy.somefriendgirl.dto.MetaDataDto;
import com.ssafy.somefriendgirl.dto.ResponseDto;
import com.ssafy.somefriendgirl.service.AlbumService;
import com.ssafy.somefriendgirl.service.AmazonS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/album")
public class AlbumController {

    private final AmazonS3Service amazonS3Service;
    private final AlbumService albumService;

    @Transactional
    @PostMapping("/upload")
    public ResponseEntity<ResponseDto> upload(@RequestHeader HttpHeaders headers,
                                              @RequestPart("multipartFile") List<MultipartFile> multipartFiles,
                                              GpsRequestDto gpsRequestDto) throws IOException, ImageProcessingException, MetadataException {
        String accessToken = headers.get("access_token").toString();
        log.info("여사친 사진 업로드 POST: /album/upload, gpsRequestDto : {}", gpsRequestDto);

        List<MetaDataDto> metaDataDtos = amazonS3Service.uploadFile(multipartFiles);
        ResponseDto responseDto = albumService.insertPhoto(multipartFiles, metaDataDtos, gpsRequestDto, accessToken);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseDto> getThumbPhotoList(@RequestHeader HttpHeaders headers, GpsRequestDto gpsRequestDto) {
        String accessToken = headers.get("access_token").toString();
        log.info("4분할 4사진 목록 GET: /album/list, gpsRequestDto : {}", gpsRequestDto);

        ResponseDto responseDto = albumService.selectThumbPhoto(gpsRequestDto, accessToken);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list/like")
    public ResponseEntity<ResponseDto> getPhotoLikeList(@RequestHeader HttpHeaders headers, GpsRequestDto gpsRequestDto, Pageable pageable) {
        String accessToken = headers.get("access_token").toString();
        log.info("좋아요순 사진 목록 GET: /album/list/like, gpsRequestDto : {}", gpsRequestDto);

        ResponseDto responseDto = albumService.selectLikeCntPhoto(gpsRequestDto, pageable, accessToken);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list/recent")
    public ResponseEntity<ResponseDto> getPhotoRecentList(@RequestHeader HttpHeaders headers, GpsRequestDto gpsRequestDto, Pageable pageable) {
        String accessToken = headers.get("access_token").toString();
        log.info("최신순 사진 목록 GET: /album/list/recent, gpsRequestDto : {}", gpsRequestDto);

        ResponseDto responseDto = albumService.selectPhotoIdPhoto(gpsRequestDto, pageable, accessToken);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

}
