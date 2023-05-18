package com.ssafy.somefriendboy.entity.id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class AlbumPhotoSnsId implements Serializable {
    @Column(name = "user_id")
    private String userId;

    @Column(name = "photo_id")
    private Long photoId;
}
