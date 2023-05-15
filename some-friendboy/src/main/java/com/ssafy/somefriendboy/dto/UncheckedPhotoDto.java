package com.ssafy.somefriendboy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class UncheckedPhotoDto implements Comparable<UncheckedPhotoDto>{
    @JsonProperty("album_id")
    private Long albumId;
    @JsonProperty("album_name")
    private String albumName;
    @JsonProperty("thumbnail_photo")
    private String thumbnailPhoto;
    @JsonProperty("recent_upload_time")
    private LocalDateTime recentUploadTime;
    @JsonProperty("photo_list")
    private List<PhotoDto> photoList;

    

    @Override
    public int compareTo(UncheckedPhotoDto o) {
        if(this.recentUploadTime.isBefore(o.recentUploadTime)) return 1;
        else if(this.recentUploadTime.isEqual(o.recentUploadTime)) return 0;
        return -1;
    }
}
