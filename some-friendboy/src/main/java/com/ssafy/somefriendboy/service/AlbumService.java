package com.ssafy.somefriendboy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.somefriendboy.dto.*;
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

    public ResponseDto createAlbum(String access_token, AlbumCreateDto albumCreateDto) {
        Map<String,Object> result = new HashMap<>();
        String userId = tokenCheck(access_token);
        if(userId == null){
            return setResponseDto(result,"토큰 만료",450);
        }

        Album album = Album.builder()
                .albumName(albumCreateDto.getAlbumName())
                .createdDate(LocalDateTime.now())
                .status(AlbumStatus.NORMAL)
                .build();

        Album savedAlbum = albumRepository.save(album);
        result.put("album_id",savedAlbum.getAlbumId());

        // 초대한 친구들 albumMember에 추가
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

        // 앨범 생성자도 albumMember에 추가
        AlbumMemberId albumMemberId = AlbumMemberId.builder()
                .albumId(savedAlbum.getAlbumId())
                .userId(userId)
                .albumMemberStatus(AlbumMemberStatus.ACCEPT)
                .build();
        AlbumMember albumMember = AlbumMember.builder()
                .albumMemberId(albumMemberId)
                .build();
        albumMemberRepository.save(albumMember);

        // TODO :: 친구 초대 알림
        // 가입되어있는 친구라면 초대알림
        // 가입되어있지 않은 친구라면 초대 메시지

        return setResponseDto(result,"앨범 생성 완료",200);
    }

    public ResponseDto getAlbumDetail(Long albumId) {
        Map<String,Object> result = new HashMap<>();

        Album album = albumRepository.findAlbumByAlbumId(albumId);
        List<String> albumMemberList = albumMemberRepository.findAlbumMemberIdByAlbumId(albumId);
        List<Map<String, String>> albumMemberListMap = new ArrayList<>();

        for (String albumMemberId : albumMemberList) {
            Map<String, String> albumMemberMap = new HashMap<>();
            albumMemberMap.put("id", albumMemberId);
            albumMemberListMap.add(albumMemberMap);
        }

        AlbumDetailDto albumDetailDto = AlbumDetailDto.builder()
                .albumId(album.getAlbumId())
                .albumName(album.getAlbumName())
                .albumCreatedDate(album.getCreatedDate())
                .members(albumMemberListMap)
                .build();

        result.put("albumDetail", albumDetailDto);
        return setResponseDto(result,"앨범 상세 정보",200);
    }

    public ResponseDto modifyAlbum(String access_token, AlbumModifyDto albumModifyDto) {
        Map<String,Object> result = new HashMap<>();
        String userId = tokenCheck(access_token);
        if (userId == null){
            return setResponseDto(result,"토큰 만료",450);
        }

        // userId가 albumMember에 속하는지 확인
        List<Long> myAlbumList = albumMemberRepository.findMyAlbumIdListByUserId(userId, AlbumMemberStatus.ACCEPT);
        for (Long albumId : myAlbumList) {
            // 속한다면 수정
            if (albumId == albumModifyDto.getAlbumId()) {
                albumRepository.modifyAlbumName(albumModifyDto.getAlbumId(), albumModifyDto.getNewAlbumName());
                result.put("albumId", albumId);
                result.put("newAlbumName", albumModifyDto.getNewAlbumName());
                return setResponseDto(result,"앨범 정보 수정",200);
            }
        }
        // 속하지 않는다면 수정 권한 없음 return
        return setResponseDto(result,"앨범 정보 수정 권한 없음",400);
    }

    public ResponseDto wholeList(String access_token, Pageable pageable) {
        Map<String,Object> result = new HashMap<>();
        String userId = tokenCheck(access_token);
        if(userId == null){
            return setResponseDto(result,"토큰 만료",450);
        }

        // 내가 속한 전체 앨범들 ID 불러옴
        List<Long> myAlbumIdList = albumMemberRepository.findMyAlbumIdListByUserId(userId, AlbumMemberStatus.ACCEPT);

        // 내가 속한 앨범들의 ID로 Album 정보 불러옴
        List<Album> myWholeAlbum = new ArrayList<>();
        for (Long albumId : myAlbumIdList) {
            Album album = albumRepository.findAlbumByAlbumId(albumId);
            myWholeAlbum.add(album);
        }

        // TODO :: 가장 최근에 올린 사진의 업로드 날짜를 기준으로 sort

        result.put("myAlbumList", myWholeAlbum);
        return setResponseDto(result,"앨범 목록",200);
    }

    public ResponseDto getfriendList(String access_token) {
        Map<String,Object> result = new HashMap<>();
        String userId = tokenCheck(access_token);
        if(userId == null){
            return setResponseDto(result,"토큰 만료",450);
        }

        // 카카오 친구 목록 불러오기
        String url = "https://kapi.kakao.com/v1/api/talk/friends";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBearerAuth(access_token);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
//        map.add("limit", "3");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<KakaoFriendResponseDto> response = restTemplate.exchange(url, HttpMethod.GET, request, KakaoFriendResponseDto.class);

        KakaoFriendResponseDto kakaoFriendResponseDto = response.getBody();
        result.put("kakao_friend_list",kakaoFriendResponseDto);

        // 내가 속한 앨범들의 멤버 리스트 불러오기
        // 내가 속한 전체 앨범들 ID 불러옴
        List<Long> myAlbumIdList = albumMemberRepository.findMyAlbumIdListByUserId(userId, AlbumMemberStatus.ACCEPT);

        // 내가 속한 앨범들의 ID로 Album 정보 불러와서 DTO로 반환
        List<AlbumInfoAndMemberDto> albumInfoAndMemberDtoList = new ArrayList<>();
        for (Long albumId : myAlbumIdList) {
            Album album = albumRepository.findAlbumByAlbumId(albumId);
            List<String> albumMemberList = albumMemberRepository.findAlbumMemberIdByAlbumId(albumId);

            AlbumInfoAndMemberDto albumInfoAndMemberDto = AlbumInfoAndMemberDto.builder()
                    .albumId(album.getAlbumId())
                    .albumName(album.getAlbumName())
                    .albumCreatedDate(album.getCreatedDate())
                    .members(albumMemberList)
                    .build();

            albumInfoAndMemberDtoList.add(albumInfoAndMemberDto);
        }
        result.put("myAlbum_member_list",albumInfoAndMemberDtoList);
        return setResponseDto(result,"친구 목록 리턴",200);
    }

    public ResponseDto inviteFriend(AdditionalFriendsInviteDto additionalFriendsInviteDto) {
        Map<String,Object> result = new HashMap<>();

        for (String invitedFriendId : additionalFriendsInviteDto.getInviteFriend()) {
            AlbumMemberId albumMemberId = AlbumMemberId.builder()
                    .albumId(additionalFriendsInviteDto.getAlbumId())
                    .userId(invitedFriendId)
                    .albumMemberStatus(AlbumMemberStatus.NOREPLY)
                    .build();
            AlbumMember albumMember = AlbumMember.builder()
                    .albumMemberId(albumMemberId)
                    .build();
            albumMemberRepository.save(albumMember);
        }
        return setResponseDto(result,"앨범 생성 후 친구 초대",200);
    }

    public ResponseDto getInvitedAlbumList(String access_token) {
        Map<String,Object> result = new HashMap<>();
        String userId = tokenCheck(access_token);
        if(userId == null){
            return setResponseDto(result,"토큰 만료",450);
        }

        // 내가 albumMember로 속한 앨범 중 albumAlbumMemberStatus == NOREPLY인 albumId 리스트 불러오기
        List<Long> myInvitedAlbumIdList = albumMemberRepository.findMyAlbumIdListByUserId(userId, AlbumMemberStatus.NOREPLY);
        List<Map<String, Long>> myInvitedAlbumIdListMapList = new ArrayList<>();
        for(Long albumId : myInvitedAlbumIdList) {
            Map<String, Long> myInvitedAlbumIdListMap = new HashMap<>();
            myInvitedAlbumIdListMap.put("albumId", albumId);
            myInvitedAlbumIdListMapList.add(myInvitedAlbumIdListMap);
        }
        result.put("invitedAlbumIdList", myInvitedAlbumIdListMapList);
        return setResponseDto(result,"앨범 초대 목록",200);
    }

    public ResponseDto replyInvitedAlbum(String access_token, AlbumInviteReplyDto albumInviteReplyDto) {
        Map<String,Object> result = new HashMap<>();
        String userId = tokenCheck(access_token);
        if(userId == null){
            setResponseDto(result,"토큰 만료",450);
        }

        if (albumInviteReplyDto.getReply().equals("accept")) {
            albumMemberRepository.acceptInvitedAlbumStatus(albumInviteReplyDto.getAlbumId(), userId);
            result.put("invitedAlbumId", albumInviteReplyDto.getAlbumId());
            result.put("reply", "accept");
        }
        else if (albumInviteReplyDto.getReply().equals("decline")) {
            albumMemberRepository.declineInvitedAlbumStatus(albumInviteReplyDto.getAlbumId(), userId);
            result.put("invitedAlbumId", albumInviteReplyDto.getAlbumId());
            result.put("reply", "decline");
        }

        return setResponseDto(result,"앨범 초대 응답",200);
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
