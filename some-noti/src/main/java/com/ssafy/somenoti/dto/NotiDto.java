package com.ssafy.somenoti.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.somenoti.entity.NotiStatus;
import com.ssafy.somenoti.entity.NotiType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotiDto {
    @JsonProperty("noti_id")
    private Long notiId;
    @JsonProperty("sender")
    private String senderName;
    @JsonProperty("photo_or_album_id")
    private Long photoOrAlbumid;
    private NotiStatus status;
    private NotiType type;
    private LocalDateTime date;
    private String message;
    @QueryProjection
    public NotiDto(Long notiId,String senderName, Long id, NotiStatus status, NotiType type,LocalDateTime date,String message){
        this.notiId = notiId;
        this.senderName = senderName;
        this.photoOrAlbumid = id;
        this.status = status;
        this.type = type;
        this.date = date;
        this.message = message;
    }
}
