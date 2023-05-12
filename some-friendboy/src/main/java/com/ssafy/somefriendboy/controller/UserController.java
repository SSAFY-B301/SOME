package com.ssafy.somefriendboy.controller;

import com.ssafy.somefriendboy.dto.AlbumCreateDto;
import com.ssafy.somefriendboy.dto.NotiOptionDto;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping("/mypage")
    public ResponseEntity<ResponseDto> albumCreate(@RequestHeader HttpHeaders headers) {
        log.info("마이페이지 정보 요청 GET: /user/mypage");
        String accessToken = headers.get("access_token").toString();

        ResponseDto responseDto = userService.getMypage(accessToken);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PutMapping("/noti/option")
    public ResponseEntity<ResponseDto> notiOptionChange(@RequestHeader HttpHeaders headers, @RequestBody NotiOptionDto notiOptionDto) {
        log.info("알 GET: /user/mypage");
        String accessToken = headers.get("access_token").toString();

        ResponseDto responseDto = userService.changeNotiOption(accessToken,notiOptionDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
}
