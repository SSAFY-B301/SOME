package com.ssafy.somenoti.repository.photocategory;

import java.util.List;

public interface PhotoCategoryRepositoryCustom {
    List<Long> findCategoryName(List<String> categoryName);
}
