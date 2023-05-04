package com.ssafy.somefriendboy.repository.userphotolike;

import com.ssafy.somefriendboy.entity.UserPhotoLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPhotoLikeRepository extends JpaRepository<UserPhotoLike, Long>, UserPhotoLikeRepositoryCustom {
}
