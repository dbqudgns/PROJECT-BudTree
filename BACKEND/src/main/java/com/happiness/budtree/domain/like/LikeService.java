package com.happiness.budtree.domain.like;

import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.phrase.Phrase;
import com.happiness.budtree.domain.phrase.PhraseRepository;
import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.ReturnMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final PhraseRepository phraseRepository;
    private final ReturnMember returnMember;

    // @Async
    @Transactional
    public void createLike(CustomMemberDetails customMemberDetails, Long phrase_id) {
        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        /** 비관적 락일 때 사용 하지 않음 */
        Phrase phrase = phraseRepository.findById(phrase_id)
                .orElseThrow(() -> new IllegalArgumentException("해당 글귀는 존재하지 않습니다."));

        /** 비관적 락일 때 사용
        Phrase phrase = phraseRepository.findByIdWithLock(phrase_id)
                .orElseThrow(() -> new IllegalArgumentException("해당 글귀는 존재하지 않습니다."));
         */

        if (likeRepository.existsByMemberAndPhrase(member, phrase)) {
            throw new IllegalArgumentException("좋아요를 누른 내역이 존재합니다.");
        }

        /** 문제 상황 : S-Lock 경합 문제로 인한 데드락 발생
        Like like = Like.builder()
                .member(member)
                .phrase(phrase)
                .build();
        likeRepository.save(like); // 특정 글귀의 좋아요 추가
        int totalLike = likeRepository.countByPhrase(phrase); // 특정 글귀의 좋아요 총 개수 반환
        phrase.updateLikeCount(totalLike); // 더티 체킹 : 특정 글귀의 좋아요 총 개수 업데이트
         */

        /** 해결책(1) : 비관적 락
        Like like = Like.builder()
                .member(member)
                .phrase(phrase)
                .build();
        likeRepository.save(like); // 특정 글귀의 좋아요 추가
        phrase.plusLikeCount(); // 더티 체킹 : 특정 글귀의 좋아요 총 개수 + 1 증가
         */

        /** 해결책(2) : 원자적 업데이트, 글귀의 좋아요 총 개수 1 증가 후 좋아요 레코드 삽입
         * phrase_id 레코드 먼저 배타 락 확보
         * */
        phraseRepository.increaseLikeCount(phrase_id);
        Like like = Like.builder()
                .member(member)
                .phrase(phrase)
                .build();
        likeRepository.save(like); // 특정 글귀의 좋아요 추가
    }

    // @Async
    @Transactional
    public void cancelLike(CustomMemberDetails customMemberDetails, Long phrase_id) {
        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        Phrase phrase = phraseRepository.findById(phrase_id)
                .orElseThrow(() -> new IllegalArgumentException("해당 글귀는 존재하지 않습니다."));

        /** 원자적 업데이트, 글귀의 좋아요 총 개수 1 감소 후 좋아요 레코드 삭제
         * phrase_id 레코드 먼저 배타 락 확보
         * */
        phraseRepository.decreaseLikeCount(phrase_id);
        likeRepository.deleteByMemberAndPhrase(member, phrase);
    }

}
