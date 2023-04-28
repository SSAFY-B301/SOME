package com.ssafy.somelogin.controller;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.somelogin.dto.ResponseDto;
import com.ssafy.somelogin.service.AuthService;
import com.ssafy.somelogin.util.HttpUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@RestController
@RequestMapping("/member")
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private String get_token_url;
    private String client_id;
    private String redirect_uri;
    private final HttpUtil httpUtil;
    private final AuthService authService;

    @PostMapping("/kakao")
    public ResponseEntity<?> getKaKaoToken(@RequestHeader HttpHeaders headers) throws IOException {
        String authorization_code = headers.get("authorization_code").toString();
        String redirect_base = headers.get("redirect_base").toString();
        log.debug("인가코드로 토큰 요청 POST: /member/kakao, code : {}, redirect : {}",authorization_code,redirect_base);

        log.info("auth_code : {}", authorization_code);
        ResponseDto responseDto = authService.getTokenAnduserInfo(authorization_code,redirect_base);
        return ResponseEntity.ok().body(responseDto);
    }
}
