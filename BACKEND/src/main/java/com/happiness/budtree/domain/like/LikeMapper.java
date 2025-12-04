package com.happiness.budtree.domain.like;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LikeMapper {

    // 문제상황 때 쓰임
    // 해결(2) 2. 좋아요 레코드 삽입
    void saveLike(@Param("member_id") Long member_id);

    int totalLike();

    void cancelLike(@Param("member_id") Long member_id);

    // 해결(1) 2. 좋아요 추가
    void saveLikeWithPhraseId(@Param("member_id") Long memberId, @Param("phrase_id") Long phraseId);
}
