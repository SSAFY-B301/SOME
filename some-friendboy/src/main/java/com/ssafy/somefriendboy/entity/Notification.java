package com.ssafy.somefriendboy.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
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
    private String content;
    private LocalDateTime createdDate;

    public Notification createNoti(User sender,User receiver){
        Notification notification = new Notification();
        notification.sender = sender;
        notification.receiver = receiver;
        notification.createdDate = LocalDateTime.now();
        notification.status = NotiStatus.UNCHECKED;
        return notification;
    }
}
