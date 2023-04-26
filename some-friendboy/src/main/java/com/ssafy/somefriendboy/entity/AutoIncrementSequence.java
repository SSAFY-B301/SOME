package com.ssafy.somefriendboy.entity;

import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document
@Getter
public class AutoIncrementSequence {

    @Id
    private String id;
    private Long seq;

}
