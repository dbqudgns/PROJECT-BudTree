package com.happiness.budtree.domain.like;

import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.phrase.PhraseMapper;
import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.ReturnMember;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final PhraseMapper phraseMapper;
    private final LikeMapper likeMapper;
    private final ReturnMember returnMember;

    @Async
    @Transactional
    public void createLike(CustomMemberDetails customMemberDetails) {
        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        /** 문제 상황 : S-Lock 경합 문제로 인한 데드락 발생
        likeMapper.saveLike(member.getMemberId()); // 특정 글귀의 좋아요 추가
        int totalLike = likeMapper.totalLike(); // 특정 글귀의 좋아요 총 개수 반환
        phraseMapper.updatePhrase(totalLike); // 특정 글귀의 좋아요 총 개수 업데이트
        */

        /** 해결책(1) : 비관적 락
        Long phraseId = phraseMapper.getPhraseId();
        likeMapper.saveLikeWithPhraseId(member.getMemberId(), phraseId);
        phraseMapper.plusLikeCount(phraseId);
         */

        /** 해결책(2) : 글귀의 좋아요 총 개수 1 증가 후 좋아요 레코드 삽입 */
        phraseMapper.updateLikeCount();
        likeMapper.saveLike(member.getMemberId());
    }

    @Transactional
    public void cancelLike(CustomMemberDetails customMemberDetails) {
        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        likeMapper.cancelLike(member.getMemberId()); // 특정 글귀의 좋아요 삭제
        int totalLike = likeMapper.totalLike(); // 특정 글귀의 좋아요 총 개수 반환
        phraseMapper.updatePhrase(totalLike); // 특정 글귀의 좋아요 총 개수 업데이트
    }

}
