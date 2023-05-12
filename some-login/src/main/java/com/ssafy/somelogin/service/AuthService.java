package com.ssafy.somelogin.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.somelogin.dto.OpenIdResponseDto;
import com.ssafy.somelogin.dto.ResponseDto;
import com.ssafy.somelogin.dto.UserInfoDto;
import com.ssafy.somelogin.entity.User;
import com.ssafy.somelogin.repository.UserRepository;
import com.ssafy.somelogin.util.HttpUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private String get_token_url = "https://kauth.kakao.com/oauth/token";
    private String client_id = "ed5919bad756edb432bdb8d297df428a";
    //private String redirect_uri = "http://localhost:3000/oauth/redirect";

    private final HttpUtil httpUtil;
    private final UserRepository userRepository;

    @Transactional
    public ResponseDto getTokenAnduserInfo(String authorization_code,String redirect_base) throws IOException {
        String access_Token = "";
        String refresh_Token = "";
        ResponseDto responseDto = new ResponseDto<>();
        HashMap<String, Object> resultMap = new HashMap<>();

        String requestURL = get_token_url;

        URL url = new URL(requestURL);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);

        // POST 요청에 필요로 요고하는 파라미터 스트림을 통해 전송
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
        StringBuilder sb = new StringBuilder();

        sb.append("grant_type=authorization_code");
        sb.append("&client_id=" + client_id); // TODO REST_API_KEY 입력
        sb.append("&redirect_uri=" + redirect_base+"/oauth/redirect"); // TODO 인가코드 받은 redirect_uri 입력
        sb.append("&prompt=login");
        sb.append("&code=" + authorization_code);
        bw.write(sb.toString());
        bw.flush();
        //인가코드로 토큰 받아오기
        log.info(sb.toString());
        //결과 코드가 200이라면 성공
        int responseCode = connection.getResponseCode();
        log.info("get_token_res_code : {}", responseCode);

        if(responseCode == 400){
            //Error
            responseDto.setMessage("인가 코드로 토큰 받는 과정에서 오류");
            responseDto.setStatus_code(450);
            return responseDto;
        }
        //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
        BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String line = "";
        String result = "";

        while ((line = br.readLine()) != null) {
            result += line;
        }

        //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(result);

        access_Token = element.getAsJsonObject().get("access_token").getAsString();
        refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

        log.info("access_token : {}", access_Token);
        log.info("refresh_token : {}", refresh_Token);

        //access-token을 파싱 하여 카카오 id가 디비에 있는지 확인
        String user_id = httpUtil.parseToken(access_Token);
        log.info("parse result : {}", user_id);

        if(user_id == null){ //카카오에서 에러래요
            log.error("유효하지 않은 토큰");
            responseDto.setStatus_code(400);
            responseDto.setMessage("토큰 파싱과정에서 오류");
            return responseDto;
        }
        else{ //DB에 회원정보있어? 없으면 insert하고 리턴
            String url2 = "https://kapi.kakao.com/v1/oidc/userinfo";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.setBearerAuth(access_Token);

            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<OpenIdResponseDto> response = restTemplate.exchange(url2, HttpMethod.GET, request, OpenIdResponseDto.class);

            OpenIdResponseDto openIdResponseDto = response.getBody();
            String picture = openIdResponseDto.getPicture();
            picture = picture.replace("http", "https");
            User user = User.builder()
                    .userId(openIdResponseDto.getSub())
                    .userEmail(openIdResponseDto.getEmail())
                    .userImg(picture)
                    .createdDate(LocalDateTime.now())
                    .userName(openIdResponseDto.getNickname())
                    .build();
            Optional<User> byId = userRepository.findById(user_id);
            if(byId.isEmpty()){
                user.setNotiSns(true);
                user.setNotiInvite(true);
                user.setNotiUpload(true);
            }
            else{
                User user1 = byId.get();
                user.setNotiInvite(user1.getNotiInvite());
                user.setNotiSns(user1.getNotiSns());
                user.setNotiUpload(user1.getNotiUpload());
            }
            userRepository.save(user);
        }
        responseDto.setData(access_Token);
        responseDto.setMessage("로그인 성공, 토큰 리턴");
        responseDto.setStatus_code(200);
        return responseDto;
    }

    public ResponseDto getUserId(String accessToken) {
        ResponseDto responseDto = new ResponseDto<>();
        HashMap<String, Object> resultMap = new HashMap<>();

        String userId = httpUtil.parseToken(accessToken);

        if(userId == null){
            responseDto.setData(resultMap);
            responseDto.setMessage("토큰 검증 실패");
            responseDto.setStatus_code(400);
            return responseDto;
        }
        resultMap.put("user_id",userId);
        responseDto.setData(resultMap);
        responseDto.setMessage("토큰 검증 성공");
        responseDto.setStatus_code(200);
        return responseDto;
    }

    public ResponseDto getUserInfo(String accessToken) {
        ResponseDto responseDto = new ResponseDto<>();

        String userId = httpUtil.parseToken(accessToken);
        if(userId == null){
            responseDto.setData(null);
            responseDto.setMessage("토큰 만료");
            responseDto.setStatus_code(450);
            return responseDto;
        }
        Optional<User> byId = userRepository.findById(userId);
        User user = byId.get();
        UserInfoDto userInfoDto = UserInfoDto.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userImg(user.getUserImg())
                .build();

        responseDto.setData(userInfoDto);
        responseDto.setMessage("회원 정보 리턴 성공");
        responseDto.setStatus_code(200);
        return responseDto;
    }
}

