package com.ssafy.somefriendboy.util;

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

    private static String requestUrl = "http://3.35.18.146:9000/auth/user/userid";

    public static String requestParingToken(String token){
        try{
            log.info("url : {}", requestUrl);
            URL url = new URL(requestUrl);  // URL 객체

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
                String user_id = data.getAsJsonObject().get("user_id").toString();
                log.info("user_id : {}", user_id);

                return user_id;
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
