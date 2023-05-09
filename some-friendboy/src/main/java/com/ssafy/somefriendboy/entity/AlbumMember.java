package com.ssafy.somefriendboy.entity;

import com.ssafy.somefriendboy.entity.id.AlbumMemberId;
import com.ssafy.somefriendboy.entity.status.AlbumMemberStatus;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder @Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumMember {
    @EmbeddedId
    private AlbumMemberId albumMemberId;

    @Column(name = "user_status")
    @Enumerated(EnumType.STRING)
    private AlbumMemberStatus albumMemberStatus;
}
