package com.ssafy.somefriendboy.repository.album;

import com.ssafy.somefriendboy.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album,Long>, AlbumRepositoryCustom {
}
