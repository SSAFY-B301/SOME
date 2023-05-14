package com.ssafy.somenoti.repository.photocategory;

import com.ssafy.somenoti.entity.PhotoCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoCategoryRepository extends JpaRepository<PhotoCategory, Long>,PhotoCategoryRepositoryCustom {
}
