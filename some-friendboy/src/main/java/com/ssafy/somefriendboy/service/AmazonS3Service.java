package com.ssafy.somefriendboy.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.somefriendboy.dto.MetaDataDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AmazonS3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String S3Bucket;
    private final AmazonS3Client amazonS3Client;

    public List<MetaDataDto> uploadFile(List<MultipartFile> multipartFiles) throws IOException {
        List<MetaDataDto> metaDataDtos = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFiles) {
            String originalName = URLEncoder.encode(multipartFile.getOriginalFilename(), "UTF-8");
            long size = multipartFile.getSize();

            ObjectMetadata objectMetaData = new ObjectMetadata();
            objectMetaData.setContentType(multipartFile.getContentType());
            objectMetaData.setContentLength(size);

            amazonS3Client.putObject(
                    new PutObjectRequest(S3Bucket, originalName, multipartFile.getInputStream(), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );

            String imagePath = amazonS3Client.getUrl(S3Bucket, originalName).toString();
            MetaDataDto metaDataDto = MetaDataDto.builder().multipartFile(multipartFile)
                    .url(imagePath).build();
            metaDataDtos.add(metaDataDto);
        }

        return metaDataDtos;
    }

}
