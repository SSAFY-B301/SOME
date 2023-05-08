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
        log.info("앨범 생성 POST: /album/create, albumCreateDto : {}", albumCreateDto);
        String access_token = headers.get("access_token").toString();

        ResponseDto responseDto = albumService.createAlbum(access_token, albumCreateDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/detail/{albumId}")
    public ResponseEntity<ResponseDto> albumDetail(@RequestHeader HttpHeaders headers, @PathVariable Long albumId) {
        log.info("앨범 상세 정보 GET: /album/detail, albumId : ", albumId);
        String access_token = headers.get("access_token").toString();

        ResponseDto responseDto = albumService.getAlbumDetail(access_token, albumId);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

//    @GetMapping("/search/{albumName}")
//    public ResponseEntity<ResponseDto> albumSearch(@RequestHeader HttpHeaders headers, @PathVariable String albumName) {
//        log.info("앨범 이름으로 검색 GET: /album/search, albumName : ", albumName);
//        String access_token = headers.get("access_token").toString();
//
//        ResponseDto responseDto = albumService.searchAlbum(access_token, albumName);
//        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
//    }

    @Transactional
    @PutMapping("/modify/name")
    public ResponseEntity<ResponseDto> albumModifyName(@RequestHeader HttpHeaders headers, @RequestBody AlbumModifyNameDto albumModifyDto) {
        log.info("앨범 이름 수정 PUT: /album/modify/name, albumModifyDto : {}", albumModifyDto);
        String access_token = headers.get("access_token").toString();

        ResponseDto responseDto = albumService.modifyAlbumName(access_token, albumModifyDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @Transactional
    @PutMapping("/modify/thumbnail")
    public ResponseEntity<ResponseDto> albumModifyThumbnail(@RequestHeader HttpHeaders headers, @RequestBody AlbumModifyThumbnailDto albumModifyThumbnailDto) {
        log.info("앨범 썸네일 이미지 변경 PUT: /album/modify/thumbnail, albumModifyThumbnailDto : {}", albumModifyThumbnailDto);
        String access_token = headers.get("access_token").toString();

        ResponseDto responseDto = albumService.modifyAlbumThumbnail(access_token, albumModifyThumbnailDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list/whole")
    public ResponseEntity<ResponseDto> albumWholeList(@RequestHeader HttpHeaders headers, Pageable pageable) {
        log.info("전체 앨범 목록 요청 GET: /album/list/whole, pageable : {}", pageable);
        String access_token = headers.get("access_token").toString();

        ResponseDto responseDto = albumService.wholeList(access_token, pageable);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @Transactional
    @PutMapping("/fav/{albumId}")
    public ResponseEntity<ResponseDto> albumFav(@RequestHeader HttpHeaders headers, @PathVariable Long albumId) {
        log.info("즐겨찾는 앨범 등록 PUT: /album/fav, albumId : ", albumId);
        String access_token = headers.get("access_token").toString();

        ResponseDto responseDto = albumService.favAlbum(access_token, albumId);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list/fav")
    public ResponseEntity<ResponseDto> albumFavList(@RequestHeader HttpHeaders headers, Pageable pageable) {
        log.info("즐겨찾는 앨범 리스트 GET: /album/list/fav, pageable : {}", pageable);
        String access_token = headers.get("access_token").toString();

        ResponseDto responseDto = albumService.getFavAlbumList(access_token, pageable);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list/friend")
    public ResponseEntity<ResponseDto> friendList(@RequestHeader HttpHeaders headers) {
        String access_token = headers.get("access_token").toString();
        log.info("전체 친구 목록 GET: /album/list/friend");
        log.info("access_token : {}", access_token);

        ResponseDto responseDto = albumService.getfriendList(access_token);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/friend/invite")
    public ResponseEntity<ResponseDto> friendInvite(@RequestHeader HttpHeaders headers, @RequestBody AdditionalFriendsInviteDto additionalFriendsInviteDto) {
        String access_token = headers.get("access_token").toString();
        log.info("앨범 생성 후 추가 친구 초대 POST: /album/friend/invite, AdditionalFriendsInviteDto : ", additionalFriendsInviteDto);

        ResponseDto responseDto = albumService.inviteFriend(access_token, additionalFriendsInviteDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list/invite")
    public ResponseEntity<ResponseDto> invitedAlbumList(@RequestHeader HttpHeaders headers) {
        String access_token = headers.get("access_token").toString();
        log.info("앨범 초대요청 목록 GET: /album/list/invite");

        ResponseDto responseDto = albumService.getInvitedAlbumList(access_token);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @Transactional
    @PutMapping("/reply/invite")
    public ResponseEntity<ResponseDto> replyInvitedAlbum(@RequestHeader HttpHeaders headers, @RequestBody AlbumInviteReplyDto albumInviteReplyDto) {
        String access_token = headers.get("access_token").toString();
        log.info("앨범 초대요청 응답 PUT: /album/reply/invite, albumId : ", albumInviteReplyDto.getAlbumId());

        ResponseDto responseDto = albumService.replyInvitedAlbum(access_token, albumInviteReplyDto);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
}
