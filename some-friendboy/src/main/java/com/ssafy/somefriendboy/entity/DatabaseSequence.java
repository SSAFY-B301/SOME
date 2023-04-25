package com.ssafy.somefriendboy.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document
public class DatabaseSequence {

    @Id
    private String id;
    private Long seq;

}
