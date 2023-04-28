package com.ssafy.somefriendboy.controller;

import com.ssafy.somefriendboy.dto.AlbumCreateDto;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.service.AlbumService;
import com.ssafy.somefriendboy.util.HttpUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController @RequiredArgsConstructor
@RequestMapping("/album")
@Slf4j
public class AlbumController {
    private final AlbumService albumService;
    private HttpUtil httpUtil;
    @GetMapping("/list")
    public ResponseEntity<ResponseDto> albumList() {
        ResponseDto responseDto = null;
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDto> albumCreate(@RequestBody AlbumCreateDto albumCreateDto) {
        log.debug("앨범 생성 요청 POST: /album/create, albumCreateDto : {}",albumCreateDto);
        ResponseDto responseDto = albumService.createAlbum(albumCreateDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
    @GetMapping("/list/friend")
    public ResponseEntity<ResponseDto> friendList(@RequestHeader HttpHeaders headers) {
        String access_token = headers.get("access_token").toString();
        log.debug("친구 목록 요청 GET: /album/list/friend");
        log.info("access_token : {}", access_token);
        ResponseDto responseDto = albumService.getfriendList(access_token);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list/whole/{userId}")
    public ResponseEntity<ResponseDto> albumWholeList(@PathVariable String userId, Pageable pageable) {
        log.debug("전체 앨범 목록 요청 GET: /album/whole/userId, userId : {}, pageable : {}",userId,pageable);
        ResponseDto responseDto = albumService.wholeList(userId,pageable);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/test")
    public ResponseEntity<ResponseDto> test(@RequestHeader HttpHeaders headers) {
        String access_token = headers.get("access_token").toString();
        log.debug("TEST POST: /album/test, access_token : {}",access_token);
        String s = httpUtil.requestParingToken(access_token);
        ResponseDto responseDto = new ResponseDto();
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
}
