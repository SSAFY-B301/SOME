package com.ssafy.someauth.service;

import com.ssafy.someauth.dto.ResponseDto;
import com.ssafy.someauth.dto.UserDto;
import com.ssafy.someauth.entity.User;
import com.ssafy.someauth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public ResponseDto getUser(String userId) {
        User user = userRepository.findByUserId(userId);
        UserDto userDto = new UserDto(user.getUserId(), user.getUserName(), user.getUserEmail(), user.getUserImg());

        ResponseDto responseDto = new ResponseDto();
        responseDto.setStatusCode(200);
        responseDto.setMessage("유저 정보 조회");
        responseDto.setData(userDto);

        return responseDto;
    }
}
