package com.ssafy.someauth.config.redis;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@NoArgsConstructor
@ConfigurationProperties(prefix = "spring.redis")  // 설정 값을 불러올 때 prefix 값을 지정
@Configuration
public class RedisInfo {
    private String host;
    private int port;
}