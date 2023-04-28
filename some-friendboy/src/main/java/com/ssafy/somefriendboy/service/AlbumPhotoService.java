package com.ssafy.somefriendboy.service;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import com.drew.metadata.exif.GpsDirectory;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.somefriendboy.dto.AlbumPhotoDto;
import com.ssafy.somefriendboy.dto.MetaDataDto;
import com.ssafy.somefriendboy.dto.ResponseDto;
import com.ssafy.somefriendboy.entity.AlbumPhoto;
import com.ssafy.somefriendboy.entity.AutoIncrementSequence;
import com.ssafy.somefriendboy.repository.AlbumPhoto.AlbumPhotoRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
@RequiredArgsConstructor
public class AlbumPhotoService {

    private final AlbumPhotoRepository albumPhotoRepository;
    private final MongoOperations mongoOperations;

    public ResponseDto insertPhoto(List<MetaDataDto> metaDataDtos, Long albumId, String userId) throws ImageProcessingException, IOException {
        for (MetaDataDto metaDataDto : metaDataDtos) {
            InputStream inputStream = metaDataDto.getMultipartFile().getInputStream();
            Metadata metadata = ImageMetadataReader.readMetadata(inputStream);
            inputStream.close();

            //AI 자동 카테고리 분류 코드 추가할 위치
//            requestToFAST(metaDataDto.getMultipartFile());
            List<Long> categories = new ArrayList<>();
            categories.add(3L);
            categories.add(4L);

            AlbumPhoto albumPhoto = AlbumPhoto.builder()
                    .photoId(generateSequence(AlbumPhoto.SEQUENCE_NAME))
                    .uploadedDate(LocalDateTime.now())
                    .s3Url(metaDataDto.getUrl())
                    .categoryId(categories)
                    .albumId(albumId)
                    .userId(userId)
                    .build();

            GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);

            if (gpsDirectory != null && gpsDirectory.containsTag(GpsDirectory.TAG_LATITUDE) && gpsDirectory.containsTag(GpsDirectory.TAG_LONGITUDE)) {
                String pdsLat = String.valueOf(gpsDirectory.getGeoLocation().getLatitude());
                String pdsLon = String.valueOf(gpsDirectory.getGeoLocation().getLongitude());
                double lat = Double.parseDouble(pdsLat);
                double lon = Double.parseDouble(pdsLon);

                albumPhoto.setGpsLatitude(lat);
                albumPhoto.setGpsLongitude(lon);
            }

            for (Directory directory : metadata.getDirectories()) {
                System.out.println(directory);
                for (Tag tag : directory.getTags()) {
                    System.out.println(tag.getDirectoryName() + "/" + tag.getTagName() + "/" + tag.getDescription());
                }
            }

            albumPhotoRepository.insert(albumPhoto);
        }

        ResponseDto responseDto = new ResponseDto();
        responseDto.setStatusCode(200);
        responseDto.setMessage("앨범 사진 등록");
        return responseDto;
    }

    public ResponseDto selectAlbumPhoto(Long albumId) {
        List<AlbumPhoto> albumPhotos = albumPhotoRepository.findByAlbumId(albumId);
        List<AlbumPhotoDto> albumPhotoDtos = albumPhotos.stream()
                .map(AlbumPhotoDto::new).collect(Collectors.toList());

        ResponseDto responseDto = new ResponseDto();
        responseDto.setStatusCode(200);
        responseDto.setMessage("앨범 사진 목록");
        responseDto.setData(albumPhotoDtos);
        return responseDto;
    }

    public ResponseDto selectPhoto(Long photoId) {
        AlbumPhoto albumPhoto = albumPhotoRepository.findByPhotoId(photoId);
        AlbumPhotoDto albumPhotoDto = new AlbumPhotoDto(albumPhoto);

        ResponseDto responseDto = new ResponseDto();
        responseDto.setStatusCode(200);
        responseDto.setMessage("사진 상세 보기");
        responseDto.setData(albumPhotoDto);
        return responseDto;
    }

    public ResponseDto selectCategoryPhoto(Long albumId, Long categoryId) {
        List<AlbumPhoto> albumPhotos = albumPhotoRepository.findAlbumCategoryPhoto(albumId, categoryId);
        List<AlbumPhotoDto> albumPhotoDtos = albumPhotos.stream()
                .map(AlbumPhotoDto::new).collect(Collectors.toList());

        ResponseDto responseDto = new ResponseDto();
        responseDto.setStatusCode(200);
        responseDto.setMessage("카테고리 사진 목록");
        responseDto.setData(albumPhotoDtos);
        return responseDto;
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

}
