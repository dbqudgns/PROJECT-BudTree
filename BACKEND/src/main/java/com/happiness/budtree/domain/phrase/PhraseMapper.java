package com.happiness.budtree.domain.phrase;

import com.happiness.budtree.domain.phrase.DTO.request.PhraseRegisterRQ;
import com.happiness.budtree.domain.phrase.DTO.response.TodayPhrase;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PhraseMapper {

    void savePhrase(PhraseRegisterRQ registerRQ);

    TodayPhrase getPhrase();
}
