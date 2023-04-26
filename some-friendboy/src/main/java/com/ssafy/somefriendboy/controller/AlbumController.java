package com.ssafy.somefriendboy.controller;

import com.ssafy.somefriendboy.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/album")
public class AlbumController {

    @GetMapping("/list")
    public ResponseEntity<?> albumList() {
        ResponseDto responseDto = null;
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

}
