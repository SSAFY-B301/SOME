package com.ssafy.somenoti.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class PhotoCategory {

    @Id
    private Long categoryId;
    private String categoryName;

}
