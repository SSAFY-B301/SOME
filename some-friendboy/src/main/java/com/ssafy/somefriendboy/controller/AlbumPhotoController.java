package com.ssafy.somefriendboy.controller;

import com.drew.imaging.ImageProcessingException;
import com.ssafy.somefriendboy.dto.MetaDataDto;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.service.AlbumPhotoService;
import com.ssafy.somefriendboy.service.AmazonS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/photo")
public class AlbumPhotoController {

    private final AmazonS3Service amazonS3Service;
    private final AlbumPhotoService albumPhotoService;

    @PostMapping("/upload")
    public ResponseEntity<ResponseDto> upload(@RequestParam("multipartFile") List<MultipartFile> multipartFiles,
                                              @RequestParam Long albumId, @RequestParam String userId) throws IOException, ImageProcessingException {
        List<MetaDataDto> metaDataDtos = amazonS3Service.uploadFile(multipartFiles);
        ResponseDto responseDto = albumPhotoService.insertPhoto(metaDataDtos, albumId, userId);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/detail")
    public ResponseEntity<ResponseDto> getPhoto(Long photoId) {
        ResponseDto responseDto = albumPhotoService.selectPhoto(photoId);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

}
