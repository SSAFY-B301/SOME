package com.ssafy.somefriendboy.service;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifSubIFDDirectory;
import com.drew.metadata.exif.GpsDirectory;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.somefriendboy.dto.AlbumPhotoDto;
import com.ssafy.somefriendboy.dto.AlbumPhotoListDto;
import com.ssafy.somefriendboy.dto.MetaDataDto;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.entity.AlbumPhoto;
import com.ssafy.somefriendboy.entity.AutoIncrementSequence;
import com.ssafy.somefriendboy.entity.PhotoCategory;
import com.ssafy.somefriendboy.repository.AlbumPhoto.AlbumPhotoRepository;
import com.ssafy.somefriendboy.repository.album.AlbumRepository;
import com.ssafy.somefriendboy.util.HttpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
@RequiredArgsConstructor
public class AlbumPhotoService {

    private final AlbumPhotoRepository albumPhotoRepository;
    private final AlbumRepository albumRepository;
    private final MongoOperations mongoOperations;
    private final HttpUtil httpUtil;

    public ResponseDto insertPhoto(List<MetaDataDto> metaDataDtos, Long albumId, String accessToken) throws ImageProcessingException, IOException {
        Map<String, Object> result = new HashMap<>();
        String userId = tokenCheck(accessToken);

        if (userId == null) {
            return setResponseDto(result, "토큰 만료", 450);
        }

        Long photoId = null;

        for (MetaDataDto metaDataDto : metaDataDtos) {
            InputStream inputStream = metaDataDto.getMultipartFile().getInputStream();
            Metadata metadata = ImageMetadataReader.readMetadata(inputStream);
            inputStream.close();

            //AI 자동 카테고리 분류
            List<String> categoryName = requestToFAST(metaDataDto.getMultipartFile());
            List<Long> categoryId = albumPhotoRepository.findCategoryName(categoryName);

            AlbumPhoto albumPhoto = AlbumPhoto.builder()
                    .photoId(generateSequence(AlbumPhoto.SEQUENCE_NAME))
                    .uploadedDate(LocalDateTime.now())
                    .s3Url(metaDataDto.getUrl())
                    .categoryId(categoryId)
                    .albumId(albumId)
                    .userId(userId)
                    .build();

            ExifSubIFDDirectory exifSubIFDDirectory = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
            GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);

            if (exifSubIFDDirectory != null && exifSubIFDDirectory.containsTag(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL)) {
                Date date = exifSubIFDDirectory.getDateOriginal();
                System.out.println(date);
                albumPhoto.setShootDate(date);
            }

            if (gpsDirectory != null && gpsDirectory.containsTag(GpsDirectory.TAG_LATITUDE) && gpsDirectory.containsTag(GpsDirectory.TAG_LONGITUDE)) {
                String pdsLat = String.valueOf(gpsDirectory.getGeoLocation().getLatitude());
                String pdsLon = String.valueOf(gpsDirectory.getGeoLocation().getLongitude());
                double lat = Double.parseDouble(pdsLat);
                double lon = Double.parseDouble(pdsLon);

                albumPhoto.setGpsLatitude(lat);
                albumPhoto.setGpsLongitude(lon);
            }

            albumPhotoRepository.insert(albumPhoto);
            photoId = albumPhoto.getPhotoId();
        }

        //앨범에 최신 업로드 사진 아이디 갱신하기
        if (photoId != null) {
            albumRepository.modifyAlbumRecentPhoto(albumId, photoId);
        }

        return setResponseDto(result, "앨범 사진 등록", 200);
    }

    public ResponseDto selectPhoto(String accessToken, Long photoId) {
        Map<String, Object> result = new HashMap<>();
        String userId = tokenCheck(accessToken);

        if (userId == null) {
            return setResponseDto(result, "토큰 만료", 450);
        }

        AlbumPhoto albumPhoto = albumPhotoRepository.findByPhotoId(photoId);
        AlbumPhotoDto albumPhotoDto = new AlbumPhotoDto(albumPhoto);

        result.put("albumPhotoDetail", albumPhotoDto);
        return setResponseDto(result, "사진 상세 보기", 200);
    }

    public ResponseDto selectAlbumPhoto(String accessToken, AlbumPhotoListDto albumPhotoListDto) {
        Map<String, Object> result = new HashMap<>();
        String userId = tokenCheck(accessToken);

        if (userId == null) {
            return setResponseDto(result, "토큰 만료", 450);
        }

        List<AlbumPhoto> albumPhotos = albumPhotoRepository.findAlbumPhoto(albumPhotoListDto.getAlbumId(),
                albumPhotoListDto.getCategoryId(), albumPhotoListDto.getUserId());
        List<AlbumPhotoDto> albumPhotoDtos = albumPhotos.stream()
                .map(AlbumPhotoDto::new).collect(Collectors.toList());

        result.put("albumPhotoList", albumPhotoDtos);
        return setResponseDto(result, "앨범 사진 목록", 200);
    }

    private Long generateSequence(String seqName) {
        AutoIncrementSequence counter = mongoOperations.findAndModify(Query.query(where("_id").is(seqName)),
                new Update().inc("seq", 1), options().returnNew(true).upsert(true), AutoIncrementSequence.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 1;
    }

    private List<String> requestToFAST(MultipartFile multipartFile) throws IOException {
        String url = "http://3.35.18.146:8000/yolo/file";

        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

        // Body set
        MultiValueMap<String, ByteArrayResource> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(multipartFile.getBytes()) {
            @Override
            public String getFilename() {
                return multipartFile.getOriginalFilename();
            }
        });

        // Message
        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        // Request
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestMessage,
                String.class
        );

        //JSON Parsing to String[]
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());
        JsonNode category = jsonNode.get("category");

        List<String> categoryArray = new ArrayList<>();
        for (int i = 0; i < category.get(0).size(); i++) {
            categoryArray.add(category.get(0).get(i).asText());
        }

        return categoryArray;
    }

    private ResponseDto setResponseDto(Map<String, Object> result, String message, int statusCode) {
        ResponseDto responseDto = new ResponseDto();
        responseDto.setData(result);
        responseDto.setMessage(message);
        responseDto.setStatusCode(statusCode);
        return responseDto;
    }

    private String tokenCheck(String accessToken) {
        return httpUtil.requestParingToken(accessToken);
    }

}
