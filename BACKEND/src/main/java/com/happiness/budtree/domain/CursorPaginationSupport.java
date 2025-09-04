package com.happiness.budtree.domain;

import com.happiness.budtree.domain.post.Emotion;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

// 사용자 정의 레포지토리 : 커서 기반 페이지네이션
public interface CursorPaginationSupport<T> {
    Slice<T> findByCursor(String username, Long cursor, int year, int month, Pageable pageable);

    Slice<T> findByEmotionAndCursor(String username, Long cursor, Emotion emotion, Pageable pageable);
}
