package com.ssafy.somenoti.repository.album;

import com.ssafy.somenoti.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album,Long>, AlbumRepositoryCustom {
    String findAlbumNameByAlbumId(Long id);
}
