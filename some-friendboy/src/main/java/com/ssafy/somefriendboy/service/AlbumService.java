package com.ssafy.somefriendboy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.somefriendboy.dto.AlbumCreateDto;
import com.ssafy.somefriendboy.dto.KakaoFriendResponseDto;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.entity.*;
import com.ssafy.somefriendboy.repository.album.AlbumRepository;
import com.ssafy.somefriendboy.repository.albummember.AlbumMemberRepository;
import com.ssafy.somefriendboy.util.HttpUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Log4j2
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final AlbumMemberRepository albumMemberRepository;
    private final HttpUtil httpUtil;
    public ResponseDto createAlbum(AlbumCreateDto albumCreateDto, String access_token) {
        Map<String,Object> result = new HashMap<>();
        String userId = tokenCheck(access_token);
        if(userId == null){
            setResponseDto(result,"토큰 만료",450);
        }

        Album album = Album.builder()
                .albumName(albumCreateDto.getAlbumName())
                .createdDate(LocalDateTime.now())
                .status(AlbumStatus.NORMAL)
                .build();

        Album savedAlbum = albumRepository.save(album);
        result.put("album_id",savedAlbum.getAlbumId());

        for (String invitedFriendId : albumCreateDto.getInviteFriend()) {
            AlbumMemberId albumMemberId = AlbumMemberId.builder()
                    .albumId(savedAlbum.getAlbumId())
                    .userId(invitedFriendId)
                    .albumMemberStatus(AlbumMemberStatus.NOREPLY)
                    .build();
            AlbumMember albumMember = AlbumMember.builder()
                    .albumMemberId(albumMemberId)
                    .build();
            albumMemberRepository.save(albumMember);
        }

        // TODO 친구 초대 알림
        // 가입되어있는 친구라면 초대알림
        // 가입되어있지 않은 친구라면 초대 메시지

        return setResponseDto(result,"앨범 생성 완료",200);
    }

    public ResponseDto wholeList(String userId, Pageable pageable) {
        Map<String,Object> result = new HashMap<>();

        // 내가 속한 전체 앨범들 ID 불러옴
        List<Long> myAlbumIdList = albumMemberRepository.findMyAlbumIdList(userId);
        result.put("myAlbumIdList",myAlbumIdList);

        // 내가 속한 앨범들의 ID로 Album 정보 불러옴
        List<Album> wholeAlbum = albumRepository.findWholeAlbum();
        result.put("myAlbumList",wholeAlbum);

        //

        return setResponseDto(result,"앨범 목록",200);
    }

    public ResponseDto getfriendList(String accessToken) {
        Map<String,Object> result = new HashMap<>();
        String url = "https://kapi.kakao.com/v1/api/talk/friends";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBearerAuth(accessToken);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
//        map.add("limit", "3");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<KakaoFriendResponseDto> response = restTemplate.exchange(url, HttpMethod.GET, request, KakaoFriendResponseDto.class);

        KakaoFriendResponseDto kakaoFriendResponseDto = response.getBody();
        result.put("kakao_list",kakaoFriendResponseDto);
        return setResponseDto(result,"친구목록 리턴",200);
    }

    private ResponseDto setResponseDto(Map<String,Object> result, String message, int statusCode){
        ResponseDto responseDto = new ResponseDto();
        responseDto.setData(result);
        responseDto.setMessage(message);
        responseDto.setStatusCode(statusCode);
        return responseDto;
    }
    private String tokenCheck(String accessToken){
        return httpUtil.requestParingToken(accessToken);
    }
}
