package com.ssafy.somefriendboy.repository.feedback;

import com.ssafy.somefriendboy.entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedBackRepository extends JpaRepository<FeedBack, Long> {
}
