package com.ssafy.somefriendboy.repository.albumfav;

import com.ssafy.somefriendboy.entity.AlbumFav;
import com.ssafy.somefriendboy.entity.AlbumMemberId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumFavRepository extends JpaRepository<AlbumFav, AlbumMemberId>, AlbumFavRepositoryCustom {
    AlbumFav findAlbumFavByAlbumMemberId_AlbumIdAndAlbumMemberId_UserId(Long albumId, String userId);
}
