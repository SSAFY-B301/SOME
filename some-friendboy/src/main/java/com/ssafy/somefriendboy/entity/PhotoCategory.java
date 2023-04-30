package com.ssafy.somefriendboy.entity;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class PhotoCategory {

    @Id
    private Long categoryId;
    private String categoryName;

}
