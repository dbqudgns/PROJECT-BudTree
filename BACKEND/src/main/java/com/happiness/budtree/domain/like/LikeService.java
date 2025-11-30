package com.happiness.budtree.domain.like;

import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.phrase.PhraseMapper;
import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.ReturnMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final PhraseMapper phraseMapper;
    private final LikeMapper likeMapper;
    private final ReturnMember returnMember;

    @Transactional
    public void createLike(CustomMemberDetails customMemberDetails) {
        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        likeMapper.saveLike(member.getMemberId()); // 특정 글귀의 좋아요 추가
        int totalLike = likeMapper.totalLike(); // 특정 글귀의 좋아요 총 개수 반환
        phraseMapper.updatePhrase(totalLike); // 특정 글귀의 좋아요 총 개수 업데이트
    }

    @Transactional
    public void cancelLike(CustomMemberDetails customMemberDetails) {
        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        likeMapper.cancelLike(member.getMemberId()); // 특정 글귀의 좋아요 삭제
        int totalLike = likeMapper.totalLike(); // 특정 글귀의 좋아요 총 개수 반환
        phraseMapper.updatePhrase(totalLike); // 특정 글귀의 좋아요 총 개수 업데이트
    }

}
