package com.ssafy.somefriendgirl.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import javax.persistence.Transient;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Document
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AlbumPhoto {

    @Transient
    public static final String SEQUENCE_NAME = "albumPhoto_sequence";

    @Id
    private Long photoId;
    private LocalDateTime uploadedDate;
    private Date shootDate;
    private String originUrl;
    private String resizeUrl;
    private Double gpsLatitude;
    private Double gpsLongitude;
    private Double mapLatitude;
    private Double mapLongitude;
    private Long viewCnt;
    private Long likeCnt;
    private List<Long> categoryId;
    private String userId;
    private Long albumId;
    private PhotoStatus status;

}
