package com.ssafy.somefriendboy.repository.albumphotosns;


import com.ssafy.somefriendboy.entity.AlbumPhotoSNS;
import com.ssafy.somefriendboy.entity.AlbumPhotoSnsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumPhotoSNSRepository extends JpaRepository<AlbumPhotoSNS, AlbumPhotoSnsId>,AlbumPhotoSNSRepositoryCustom {
}
