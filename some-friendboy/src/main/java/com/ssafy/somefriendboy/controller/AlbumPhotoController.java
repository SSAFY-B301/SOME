package com.ssafy.somefriendboy.controller;

import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.service.AlbumPhotoService;
import com.ssafy.somefriendboy.service.AmazonS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/photo")
public class AlbumPhotoController {

    private final AmazonS3Service amazonS3Service;
    private final AlbumPhotoService albumPhotoService;

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("multipartFile") MultipartFile multipartFile) throws IOException {
        String url = amazonS3Service.uploadFile(multipartFile);
        ResponseDto responseDto = albumPhotoService.insertPhoto(multipartFile, url);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

}
