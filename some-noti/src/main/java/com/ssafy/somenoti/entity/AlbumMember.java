package com.ssafy.somenoti.entity;

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
