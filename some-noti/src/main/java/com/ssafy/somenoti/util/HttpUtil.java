package com.ssafy.somenoti.util;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.HttpURLConnection;
import java.net.URL;

@Slf4j
@Component
public class HttpUtil {

    @Value("${some-url.auth}")
    private String auth_url;
    public String requestParingToken(String token){
        try{
            log.info("url : {}", auth_url + "/user/userid");
            URL url = new URL(auth_url + "/user/userid");  // URL 객체

            // 우리 auth 서버에 HTTP 요청
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("access_token", token);

            // 응답 코드
            int responseCode = conn.getResponseCode();

            // success : 200, 유효성 error : 401
            log.info("responseCode = " + responseCode);

            if(responseCode == 200){    // 유효성 통과
                JsonObject jsonObject = GetResponse.getJsonResponse(conn).getAsJsonObject();

                JsonElement data = jsonObject.get("data");
                String user_id = data.getAsJsonObject().get("user_id").getAsString();
                log.info("user_id : {}", user_id);

                return user_id;
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
