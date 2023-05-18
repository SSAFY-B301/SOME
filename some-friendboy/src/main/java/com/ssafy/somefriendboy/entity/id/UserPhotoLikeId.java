package com.ssafy.somefriendboy.entity.id;

import lombok.*;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Builder
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class UserPhotoLikeId implements Serializable {
    private String userId;
    private Long photoId;
}
