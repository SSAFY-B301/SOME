package com.ssafy.somenoti.repository.albummember;

import com.ssafy.somenoti.entity.AlbumMember;
import com.ssafy.somenoti.entity.AlbumMemberId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumMemberRepository extends JpaRepository<AlbumMember, AlbumMemberId>, AlbumMemberRepositoryCustom{
}
