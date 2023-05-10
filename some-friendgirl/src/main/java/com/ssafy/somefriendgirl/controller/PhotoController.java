package com.ssafy.somefriendgirl.controller;

import com.ssafy.somefriendgirl.dto.ResponseDto;
import com.ssafy.somefriendgirl.service.PhotoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/photo")
public class PhotoController {

    private final PhotoService photoService;

    // 사진 상세 조회
    @GetMapping("/detail/{photoId}")
    public ResponseEntity<ResponseDto> getPhoto(@RequestHeader HttpHeaders headers, @PathVariable Long photoId) {
        String accessToken = headers.get("access_token").toString();
        log.info("사진 상세 정보 GET: /photo/detail, photoId : ", photoId);

        ResponseDto responseDto = photoService.selectPhoto(accessToken, photoId);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
}
