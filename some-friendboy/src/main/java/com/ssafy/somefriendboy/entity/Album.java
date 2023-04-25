package com.ssafy.somefriendboy.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.joda.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Album {

    @Id
    @GeneratedValue
    private Long albumId;
    private String albumName;
    private LocalDateTime createdDate;
    private Long recentPhoto;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String type;
    private String status;

}
