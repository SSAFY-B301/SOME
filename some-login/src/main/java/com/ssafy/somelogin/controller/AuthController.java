package com.ssafy.somelogin.controller;

import com.ssafy.somelogin.dto.ResponseDto;
import com.ssafy.somelogin.service.AuthService;
import com.ssafy.somelogin.util.HttpUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;


@RestController
@RequestMapping("/user")
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/kakao")
    public ResponseEntity<ResponseDto> getKaKaoToken(@RequestHeader HttpHeaders headers) throws IOException {
        log.info(headers.toString());
        if(headers.isEmpty()){
            log.info("비어있으면 뜹니다.");
        }
        String authorization_code = headers.get("authorization_code").toString();
        String redirect_base = headers.get("redirect_base").toString();
        redirect_base = redirect_base.replace("[","");
        redirect_base = redirect_base.replace("]","");
        log.info("인가코드로 토큰 요청 POST: /member/kakao, code : {}, redirect : {}",authorization_code,redirect_base);
        ResponseDto responseDto = authService.getTokenAnduserInfo(authorization_code,redirect_base);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/userid")
    public ResponseEntity<ResponseDto> getUserId(@RequestHeader HttpHeaders headers) throws IOException {
        String access_token = headers.get("access_token").toString();
        log.info("토큰 검증, 유저아이디 리턴 POST: /member/userid, access_token : {}",access_token);
        ResponseDto responseDto = authService.getUserId(access_token);
        if(responseDto.getStatus_code() == 400){
            return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<ResponseDto> getUserInfo(@RequestHeader HttpHeaders headers){
        String access_token = headers.get("access_token").toString();
        log.info("유저 정보 요청 GET: /member/info, access_token : {}",access_token);
        ResponseDto responseDto = authService.getUserInfo(access_token);

        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
}
