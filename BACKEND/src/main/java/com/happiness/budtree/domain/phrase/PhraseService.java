package com.happiness.budtree.domain.phrase;

import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.phrase.DTO.request.PhraseRegisterRQ;
import com.happiness.budtree.domain.phrase.DTO.response.TodayPhrase;
import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.ReturnMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class PhraseService {

    private final PhraseRepository phraseRepository;
    private final ReturnMember returnMember;

    @Transactional
    public void createPhrase(PhraseRegisterRQ registerRQ) {
        Phrase newPhrase = Phrase.builder()
                .content(registerRQ.content())
                .build();

        phraseRepository.save(newPhrase);
    }

    public TodayPhrase getPhrase(CustomMemberDetails customMemberDetails) {
        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        Phrase phrase = phraseRepository.findByCreatedDate(LocalDate.now())
                .orElseThrow(() -> new IllegalArgumentException("오늘의 글귀가 존재하지 없습니다."));

        return new TodayPhrase(phrase.getId(), phrase.getContent(), phrase.getLikeCount());
    }
}