package com.happiness.budtree.domain.phrase;

import com.happiness.budtree.domain.phrase.DTO.request.PhraseRegisterRQ;
import com.happiness.budtree.domain.phrase.DTO.response.TodayPhrase;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PhraseMapper {

    void savePhrase(PhraseRegisterRQ registerRQ);

    TodayPhrase getPhrase();

    void updatePhrase(@Param("totalLike") int totalLike);

    // 해결(1) 1. 비관적 락
    Long getPhraseId();

    // 해결(1) 3. 좋아요 총 개수 +1 증가
    void plusLikeCount(@Param("phrase_id") Long phraseId);

    // 해결(2) 1. 오늘의 글귀 총아요 총 개수(like_count) 1 증가
    void updateLikeCount();

    void updateLikeMinus();

}
