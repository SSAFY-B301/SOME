package com.ssafy.somefriendboy.service;

import com.amazonaws.Response;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.entity.AlbumPhoto;
import com.ssafy.somefriendboy.repository.AlbumPhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AlbumPhotoService {

    private final AlbumPhotoRepository albumPhotoRepository;

    public ResponseDto insertPhoto(MultipartFile multipartFile, String url) {
        AlbumPhoto albumPhoto = new AlbumPhoto();
//        albumPhoto.setPhotoId(sequenceGeneratorService.generateSequence(AlbumPhoto.SEQUENCE_NAME));
        albumPhoto.setS3Url(url);
        albumPhotoRepository.insert(albumPhoto);

        ResponseDto responseDto = new ResponseDto();
        responseDto.setStatusCode(200);
        responseDto.setMessage("앨범 사진 등록");
        responseDto.setData(null);
        return responseDto;
    }

}
