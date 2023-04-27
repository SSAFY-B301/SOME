package com.ssafy.somefriendboy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.somefriendboy.dto.AlbumCreateDto;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.entity.Album;
import com.ssafy.somefriendboy.entity.AlbumStatus;
import com.ssafy.somefriendboy.repository.album.AlbumRepository;
import com.ssafy.somefriendboy.repository.albummember.AlbumMemberRepository;
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
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Log4j2
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final AlbumMemberRepository albumMemberRepository;

    public ResponseDto createAlbum(AlbumCreateDto albumCreateDto) {
        Map<String,Object> result = new HashMap<>();
        ResponseDto responseDto = new ResponseDto();

        Album album = Album.builder()
                .albumName(albumCreateDto.getAlbumName())
                .createdDate(LocalDateTime.now())
                .status(AlbumStatus.NORMAL)
                .build();

        Album savedAlbum = albumRepository.save(album);
        result.put("album_id",savedAlbum.getAlbumId());

        //여기에 친구초대하는 코드
        //

        responseDto.setData(result);
        responseDto.setMessage("앨범 생성 완료");
        responseDto.setStatusCode(200);
        return responseDto;
    }

    public ResponseDto wholeList(String userId, Pageable pageable) {
        Map<String,Object> result = new HashMap<>();
        ResponseDto responseDto = new ResponseDto();

        List<Long> myAlbumIdList = albumMemberRepository.findMyAlbumIdList(userId);

        result.put("myAlbumIdList",myAlbumIdList);

        List<Album> wholeAlbum = albumRepository.findWholeAlbum();
        result.put("myAlbumList",wholeAlbum);
        responseDto.setData(result);
        responseDto.setMessage("앨범 목록");
        responseDto.setStatusCode(200);
        return responseDto;
    }

}
