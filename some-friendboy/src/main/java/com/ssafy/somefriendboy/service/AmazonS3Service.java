package com.ssafy.somefriendboy.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.MetadataException;
import com.drew.metadata.exif.ExifIFD0Directory;
import com.ssafy.somefriendboy.dto.MetaDataDto;
import com.ssafy.somefriendboy.entity.AlbumPhoto;
import com.ssafy.somefriendboy.entity.id.AutoIncrementSequence;
import lombok.RequiredArgsConstructor;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URLEncoder;
import java.util.*;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
@RequiredArgsConstructor
public class AmazonS3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String S3Bucket;
    private final AmazonS3Client amazonS3Client;
    private static Long photoId;
    private final MongoOperations mongoOperations;

    public List<MetaDataDto> uploadFile(List<MultipartFile> multipartFiles, Long albumId) throws IOException, ImageProcessingException, MetadataException {
        List<MetaDataDto> metaDataDtos = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFiles) {
            Long photoId = generateSequence(AlbumPhoto.SEQUENCE_NAME);

            String filePath = albumId + "/" + photoId + "/";
            String fileName = multipartFile.getOriginalFilename();
            String originalName = filePath + URLEncoder.encode(fileName, "UTF-8");

            ObjectMetadata objectMetaData = new ObjectMetadata();
            objectMetaData.setContentType(multipartFile.getContentType());
            objectMetaData.setContentLength(multipartFile.getSize());

            amazonS3Client.putObject(
                    new PutObjectRequest(S3Bucket, originalName, multipartFile.getInputStream(), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );

            String originUrl = amazonS3Client.getUrl(S3Bucket, originalName).toString();
            String resizeUrl = originUrl;

            InputStream resizedImage = imageResize(multipartFile, 200);
            if (resizedImage != null) {
                objectMetaData.setContentLength(resizedImage.available());
                originalName = filePath + URLEncoder.encode("thumb-" + fileName, "UTF-8");

                amazonS3Client.putObject(
                        new PutObjectRequest(S3Bucket, originalName, resizedImage, objectMetaData)
                                .withCannedAcl(CannedAccessControlList.PublicRead)
                );

                resizeUrl = amazonS3Client.getUrl(S3Bucket, originalName).toString();
            }

            MetaDataDto metaDataDto = MetaDataDto.builder().photoId(photoId)
                    .originUrl(originUrl).resizeUrl(resizeUrl).build();
            metaDataDtos.add(metaDataDto);
        }

        return metaDataDtos;
    }

    private InputStream imageResize(MultipartFile multipartFile, int targetSize) throws IOException, ImageProcessingException, MetadataException {
        BufferedImage inputImage = ImageIO.read(multipartFile.getInputStream());
        String formatName = multipartFile.getContentType().substring(multipartFile.getContentType().lastIndexOf("/") + 1);

        Metadata metadata = ImageMetadataReader.readMetadata(multipartFile.getInputStream());
        Directory directory = metadata.getFirstDirectoryOfType(ExifIFD0Directory.class);

        int orientation = 1;
        if (directory != null && directory.containsTag(ExifIFD0Directory.TAG_ORIENTATION)) orientation = directory.getInt(ExifIFD0Directory.TAG_ORIENTATION);
        if (orientation != 1) inputImage = rotateImage(inputImage, orientation);

        int inputWidth = inputImage.getWidth();
        int inputHeight = inputImage.getHeight();

        if (inputWidth <= targetSize || inputHeight <= targetSize) return null;

        int outputWidth = targetSize;
        int outputHeight = outputWidth * inputHeight / inputWidth;
        if (inputImage.getHeight() < inputImage.getWidth()) {
            outputHeight = targetSize;
            outputWidth = outputHeight * inputImage.getWidth() / inputImage.getHeight();
        }

        BufferedImage outputImage = Scalr.resize(inputImage, outputWidth, outputHeight);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(outputImage, formatName, baos);

        return new ByteArrayInputStream(baos.toByteArray());
    }

    private BufferedImage rotateImage(BufferedImage bufferedImage, int orientation) {
        BufferedImage rotatedImage = bufferedImage;

        if (orientation == 6) rotatedImage = Scalr.rotate(bufferedImage, Scalr.Rotation.CW_90);
        else if (orientation == 3) rotatedImage = Scalr.rotate(bufferedImage, Scalr.Rotation.CW_180);
        else if (orientation == 8) rotatedImage = Scalr.rotate(bufferedImage, Scalr.Rotation.CW_270);

        return rotatedImage;
    }

    private Long generateSequence(String seqName) {
        AutoIncrementSequence counter = mongoOperations.findAndModify(Query.query(where("_id").is(seqName)),
                new Update().inc("seq", 1), options().returnNew(true).upsert(true), AutoIncrementSequence.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 1;
    }

}
