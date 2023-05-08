package com.ssafy.somefriendboy.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver")
    private User receiver;

    @Enumerated(EnumType.STRING)
    private NotiType type;

    @Enumerated(EnumType.STRING)
    private NotiStatus status;
    private String message;
    private LocalDateTime createdDate;
    private Long albumOrPhotoId;
}
