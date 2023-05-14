package com.ssafy.somenoti.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.somenoti.dto.AiCategoryCreateDto;
import com.ssafy.somenoti.entity.AlbumPhoto;
import com.ssafy.somenoti.repository.albumphoto.AlbumPhotoRepository;
import com.ssafy.somenoti.repository.photocategory.PhotoCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CategoryService {
    private final AlbumPhotoRepository albumPhotoRepository;
    private final PhotoCategoryRepository photoCategoryRepository;
    @Value("${some-url.fast-api}")
    private String ai_url;

    @Transactional
    public void photoCategory(AiCategoryCreateDto aiCategoryCreateDto) throws IOException {
        List<List<Long>> lists = requestToFAST(aiCategoryCreateDto.getMultipartFiles());
        List<AlbumPhoto> byPhotoIdIn = albumPhotoRepository.findByPhotoIdIn(aiCategoryCreateDto.getPhotoIds());

        int i = 0;
        for (AlbumPhoto albumPhoto : byPhotoIdIn) {
            albumPhoto.setCategoryId(lists.get(i++));
            albumPhotoRepository.save(albumPhoto);
        }
    }

    private List<List<Long>> requestToFAST(List<MultipartFile> multipartFiles) throws IOException {

        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

        // Body set
        MultiValueMap<String, ByteArrayResource> body = new LinkedMultiValueMap<>();
        for (MultipartFile multipartFile : multipartFiles) {
            ByteArrayResource byteArrayResource = new ByteArrayResource(multipartFile.getBytes()) {
                @Override
                public String getFilename() {
                    return multipartFile.getOriginalFilename();
                }
            };
            body.add("file", byteArrayResource);
        }

        // Message
        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        // Request
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                ai_url,
                HttpMethod.POST,
                requestMessage,
                String.class
        );

        //JSON Parsing to String[]
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());
        JsonNode category = jsonNode.get("category");

        List<List<Long>> categoryArray = new ArrayList<>();

        for (int i = 0; i < category.size(); i++) {
            List<String> cate = new ArrayList<>();
            for (int j = 0; j < category.get(i).size(); j++) {
                cate.add(category.get(i).get(j).asText());
            }

            List<Long> cateId = photoCategoryRepository.findCategoryName(cate);
            categoryArray.add(cateId);
        }

        return categoryArray;
    }
}
