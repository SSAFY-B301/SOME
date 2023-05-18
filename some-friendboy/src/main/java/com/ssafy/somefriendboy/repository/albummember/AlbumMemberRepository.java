package com.ssafy.somefriendboy.repository.albummember;

import com.ssafy.somefriendboy.entity.AlbumMember;
import com.ssafy.somefriendboy.entity.id.AlbumMemberId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumMemberRepository extends JpaRepository<AlbumMember, AlbumMemberId>, AlbumMemberRepositoryCustom{
}
