package com.ssafy.somefriendgirl.controller;

import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.MetadataException;
import com.ssafy.somefriendgirl.dto.GpsDto;
import com.ssafy.somefriendgirl.dto.MetaDataDto;
import com.ssafy.somefriendgirl.dto.ResponseDto;
import com.ssafy.somefriendgirl.service.AlbumService;
import com.ssafy.somefriendgirl.service.AmazonS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
                                              GpsDto gpsDto) throws IOException, ImageProcessingException, MetadataException {
        String accessToken = headers.get("access_token").toString();
        log.info("사진 업로드 POST: /photo/upload, gpsDto : {}", gpsDto);

        List<MetaDataDto> metaDataDtos = amazonS3Service.uploadFile(multipartFiles);
        ResponseDto responseDto = albumService.insertPhoto(multipartFiles, metaDataDtos, gpsDto, accessToken);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

}
