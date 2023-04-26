package com.ssafy.somefriendboy.entity;

import lombok.Getter;
import lombok.Setter;
import org.joda.time.LocalDateTime;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Document
@Getter @Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumPhoto {

    @Transient
    public static final String SEQUENCE_NAME = "albumPhoto_sequence";

    @Id
    private Long photoId;
    private LocalDateTime uploadedDate;
    private LocalDateTime shootDate;
    private String s3Url;
    private String shootLocation;
    private String category;
    private Long userId;
    private Album album;

}
