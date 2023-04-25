package com.ssafy.somefriendboy.entity;

import lombok.Getter;
import lombok.Setter;
import org.joda.time.LocalDateTime;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import javax.persistence.Transient;

@Document
@Getter @Setter
public class AlbumPhoto {

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
