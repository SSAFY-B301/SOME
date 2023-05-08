package com.ssafy.somenoti.repository.albumphotosns;


import com.ssafy.somenoti.entity.AlbumPhotoSNS;
import com.ssafy.somenoti.entity.AlbumPhotoSnsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumPhotoSNSRepository extends JpaRepository<AlbumPhotoSNS, AlbumPhotoSnsId>,AlbumPhotoSNSRepositoryCustom {
}
