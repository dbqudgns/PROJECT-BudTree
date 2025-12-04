package com.happiness.budtree.domain.phrase;

import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.phrase.DTO.request.PhraseRegisterRQ;
import com.happiness.budtree.domain.phrase.DTO.response.TodayPhrase;
import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.ReturnMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PhraseService {

    private final PhraseMapper phraseMapper;
    private final ReturnMember returnMember;

    @Transactional
    public void createPhrase(PhraseRegisterRQ registerRQ) {
        phraseMapper.savePhrase(registerRQ);
    }

    public TodayPhrase getPhrase(CustomMemberDetails customMemberDetails) {

        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        return phraseMapper.getPhrase();
    }

}
