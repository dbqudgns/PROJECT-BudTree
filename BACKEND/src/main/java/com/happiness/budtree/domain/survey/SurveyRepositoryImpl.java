package com.happiness.budtree.domain.survey;

import com.happiness.budtree.domain.CursorPaginationRepository;
import com.happiness.budtree.domain.CursorPaginationSupport;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import static com.happiness.budtree.domain.survey.QSurvey.survey;

@RequiredArgsConstructor
public class SurveyRepositoryImpl implements CursorPaginationSupport<Survey> {

    private final CursorPaginationRepository cursorPaginationRepository;

    @Override
    public Slice<Survey> findByCursor(String username, Long cursor, int year, int month, Pageable pageable) {
        return cursorPaginationRepository.applyCursorPaging(survey, survey.member.username, survey.surveyId, survey.createdDate,
                                                            username, cursor, year, month, pageable);
    }
}
