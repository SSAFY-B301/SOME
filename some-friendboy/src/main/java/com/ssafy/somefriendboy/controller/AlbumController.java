package com.ssafy.somefriendboy.controller;

import com.ssafy.somefriendboy.dto.*;
import com.ssafy.somefriendboy.service.AlbumService;
import com.ssafy.somefriendboy.util.HttpUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController @RequiredArgsConstructor
@RequestMapping("/album")
@Slf4j
public class AlbumController {
    private final AlbumService albumService;
    private HttpUtil httpUtil;

    @GetMapping("/list")
    public ResponseEntity<ResponseDto> albumList() {
        ResponseDto responseDto = null;
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDto> albumCreate(@RequestHeader HttpHeaders headers, @RequestBody AlbumCreateDto albumCreateDto) {
        log.debug("앨범 생성 요청 POST: /album/create, albumCreateDto : {}", albumCreateDto);
        String access_token = headers.get("access_token").toString();

        ResponseDto responseDto = albumService.createAlbum(access_token, albumCreateDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/detail/{albumId}")
    public ResponseEntity<ResponseDto> albumDetail(@PathVariable Long albumId) {
        log.debug("앨범 상세 정보 GET: /album/detail, albumId : ", albumId);

        ResponseDto responseDto = albumService.getAlbumDetail(albumId);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @Transactional
    @PutMapping("/modify")
    public ResponseEntity<ResponseDto> albumModify(@RequestHeader HttpHeaders headers, @RequestBody AlbumModifyDto albumModifyDto) {
        log.debug("앨범 정보 수정 PUT: /album/modify, albumModifyDto : {}", albumModifyDto);
        String access_token = headers.get("access_token").toString();

        ResponseDto responseDto = albumService.modifyAlbum(access_token, albumModifyDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list/whole")
    public ResponseEntity<ResponseDto> albumWholeList(@RequestHeader HttpHeaders headers, Pageable pageable) {
        log.debug("전체 앨범 목록 요청 GET: /album/list/whole, pageable : {}", pageable);
        String access_token = headers.get("access_token").toString();

        ResponseDto responseDto = albumService.wholeList(access_token, pageable);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list/friend")
    public ResponseEntity<ResponseDto> friendList(@RequestHeader HttpHeaders headers) {
        String access_token = headers.get("access_token").toString();
        log.debug("친구 목록 요청 GET: /album/list/friend");
        log.info("access_token : {}", access_token);

        ResponseDto responseDto = albumService.getfriendList(access_token);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/friend/invite")
    public ResponseEntity<ResponseDto> friendInvite(@RequestHeader HttpHeaders headers, @RequestBody AdditionalFriendsInviteDto additionalFriendsInviteDto) {
        String access_token = headers.get("access_token").toString();
        log.debug("앨범 생성 후 친구 초대 POST: /album/friend/invite");

        ResponseDto responseDto = albumService.inviteFriend(access_token, additionalFriendsInviteDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list/invite")
    public ResponseEntity<ResponseDto> invitedAlbumList(@RequestHeader HttpHeaders headers) {
        String access_token = headers.get("access_token").toString();
        log.debug("앨범 초대 목록 GET: /album/list/invite");

        ResponseDto responseDto = albumService.getInvitedAlbumList(access_token);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @Transactional
    @PutMapping("/reply/invite")
    public ResponseEntity<ResponseDto> replyInvitedAlbum(@RequestHeader HttpHeaders headers, @RequestBody AlbumInviteReplyDto albumInviteReplyDto) {
        String access_token = headers.get("access_token").toString();
        log.debug("앨범 초대 응답 PUT: /album/reply/invite, albumId : ", albumInviteReplyDto.getAlbumId());

        ResponseDto responseDto = albumService.replyInvitedAlbum(access_token, albumInviteReplyDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }


    @PostMapping("/test")
    public ResponseEntity<ResponseDto> test(@RequestHeader HttpHeaders headers) {
        String access_token = headers.get("access_token").toString();
        log.debug("TEST POST: /album/test, access_token : {}",access_token);
        String s = httpUtil.requestParingToken(access_token);

        ResponseDto responseDto = new ResponseDto();
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
}
