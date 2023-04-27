package com.ssafy.somefriendboy.controller;

import com.ssafy.somefriendboy.dto.AlbumCreateDto;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController @RequiredArgsConstructor
@RequestMapping("/album")
public class AlbumController {
    private final AlbumService albumService;

    @GetMapping("/list")
    public ResponseEntity<ResponseDto> albumList() {
        ResponseDto responseDto = null;
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDto> albumCreate(@RequestBody AlbumCreateDto albumCreateDto) {
        ResponseDto responseDto = albumService.createAlbum(albumCreateDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/wholeList/{userId}")
    public ResponseEntity<ResponseDto> albumWholeList(@PathVariable String userId, Pageable pageable) {
        ResponseDto responseDto = albumService.wholeList(userId,pageable);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

//    @GetMapping("/test")
//    public ResponseEntity<String[]> test(MultipartFile[] multipartFiles) throws IOException {
//        String[] strings = albumService.requestToFAST(multipartFiles);
//        return new ResponseEntity<String[]>(strings, HttpStatus.OK);
//    }
}
