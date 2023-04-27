package com.ssafy.somelogin.util;

import com.google.gson.JsonElement;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.HttpURLConnection;
import java.net.URL;

@Slf4j
@Component
public class HttpUtil {
    private static String parse_token_url = "https://kapi.kakao.com/v1/user/access_token_info";


    public static String parseToken(String token){
        try{
            URL url = new URL(parse_token_url);  // URL 객체

            // KAKAO 서버에 HTTP 요청
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + token);

            // 응답 코드
            int responseCode = conn.getResponseCode();

            // success : 200, 유효성 error : 401
            log.info("responseCode =" + responseCode);

            if(responseCode == 200){    // 유효성 통과

                JsonElement element = GetResponse.getJsonResponse(conn);

                String id = element.getAsJsonObject().get("id").getAsString();
                log.info("user_id : {}", id);

                return id;
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }
}
