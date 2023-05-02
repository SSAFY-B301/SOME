package com.ssafy.somefriendboy.controller;

import com.drew.imaging.ImageProcessingException;
import com.ssafy.somefriendboy.dto.AlbumPhotoListDto;
import com.ssafy.somefriendboy.dto.MetaDataDto;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.service.AlbumPhotoService;
import com.ssafy.somefriendboy.service.AmazonS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
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
@RequestMapping("/photo")
public class AlbumPhotoController {

    private final AmazonS3Service amazonS3Service;
    private final AlbumPhotoService albumPhotoService;
    private final ResourceLoader resourceLoader;

    @Transactional
    @PostMapping("/upload")
    public ResponseEntity<ResponseDto> upload(@RequestHeader HttpHeaders headers,
                                              @RequestParam("multipartFile") List<MultipartFile> multipartFiles,
                                              @RequestParam Long albumId) throws IOException, ImageProcessingException {
        String accessToken = headers.get("access_token").toString();
        log.debug("사진 업로드 POST: /photo/upload, albumId : ", albumId);

        List<MetaDataDto> metaDataDtos = amazonS3Service.uploadFile(multipartFiles);
        ResponseDto responseDto = albumPhotoService.insertPhoto(multipartFiles, metaDataDtos, albumId, accessToken);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/download")
    public ResponseEntity<?> download(@RequestParam String url) throws IOException {
        Resource resource = resourceLoader.getResource(url);
        String imgName = resource.getFilename();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + imgName);
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }

    @GetMapping("/album/list")
    public ResponseEntity<ResponseDto> getAlbumPhoto(@RequestHeader HttpHeaders headers, @RequestBody AlbumPhotoListDto albumPhotoListDto) {
        String accessToken = headers.get("access_token").toString();
        log.debug("앨범 목록 정보 GET: /photo/album/list, albumPhotoListDto : {}", albumPhotoListDto);

        ResponseDto responseDto = albumPhotoService.selectAlbumPhoto(accessToken, albumPhotoListDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/detail")
    public ResponseEntity<ResponseDto> getPhoto(@RequestHeader HttpHeaders headers, Long photoId) {
        String accessToken = headers.get("access_token").toString();
        log.debug("사진 상세 정보 GET: /photo/detail, photoId : ", photoId);

        ResponseDto responseDto = albumPhotoService.selectPhoto(accessToken, photoId);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @Transactional
    @PutMapping("/like")
    public ResponseEntity<ResponseDto> likePhoto(@RequestHeader HttpHeaders headers, Long photoId) {
        String accessToken = headers.get("access_token").toString();
        log.debug("사진 좋아요 등록/해제 PUT: /photo/like, photoId : ", photoId);

        ResponseDto responseDto = albumPhotoService.updateLikePhoto(accessToken, photoId);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

}
