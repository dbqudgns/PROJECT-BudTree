package com.happiness.budtree.domain.survey;

import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.survey.DTO.request.SurveyAllRQ;
import com.happiness.budtree.domain.survey.DTO.request.SurveyRegisterRQ;
import com.happiness.budtree.domain.survey.DTO.response.SurveyAllRP;
import com.happiness.budtree.domain.survey.DTO.response.SurveyRegisterRP;
import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.ReturnMember;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final ReturnMember returnMember;

    @Transactional
    public SurveyRegisterRP save(SurveyRegisterRQ surveyRegisterRQ, CustomMemberDetails customMemberDetails) {
      validateSurveyRegisterRQ(surveyRegisterRQ);
        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());
        
        //이거 아마 메서드로 추출 예정
        int score = surveyRegisterRQ.part1() + surveyRegisterRQ.part2() + surveyRegisterRQ.part3() + surveyRegisterRQ.part4()
                + surveyRegisterRQ.part5() + surveyRegisterRQ.part6() + surveyRegisterRQ.part7() + surveyRegisterRQ.part8() + surveyRegisterRQ.part9();

        Level level = null;
        if (score >= 0 && score <= 4) {
            level = Level.NORMAL;
        } else if (score >= 5 && score <= 9) {
            level = Level.MINOR;
        } else if (score >= 10 && score <= 14) {
            level = Level.MIDDLE;
        } else if (score >= 15 && score <= 19) {
            level = Level.HEAVY;
        } else if (score >= 20 && score <= 27) {
            level = Level.VIOLENT;
        }

        Survey survey = Survey.builder()
                .part1(surveyRegisterRQ.part1())
                .part2(surveyRegisterRQ.part2())
                .part3(surveyRegisterRQ.part3())
                .part4(surveyRegisterRQ.part4())
                .part5(surveyRegisterRQ.part5())
                .part6(surveyRegisterRQ.part6())
                .part7(surveyRegisterRQ.part7())
                .part8(surveyRegisterRQ.part8())
                .part9(surveyRegisterRQ.part9())
                .member(member)
                .score(score)
                .level(level)
                .build();
        Survey savedSurvey = surveyRepository.save(survey);

        return SurveyRegisterRP.builder()
                .surveyId(savedSurvey.getSurveyId())
                .build();
    }

    //자가진단 검증 로직인데 추후 리팩토링 예정
    private void validateSurveyRegisterRQ(SurveyRegisterRQ surveyRegisterRQ) {
        if (!isValid(surveyRegisterRQ.part1()) ||
                !isValid(surveyRegisterRQ.part2()) ||
                !isValid(surveyRegisterRQ.part3()) ||
                !isValid(surveyRegisterRQ.part4()) ||
                !isValid(surveyRegisterRQ.part5()) ||
                !isValid(surveyRegisterRQ.part6()) ||
                !isValid(surveyRegisterRQ.part7()) ||
                !isValid(surveyRegisterRQ.part8()) ||
                !isValid(surveyRegisterRQ.part9())) {
            throw new IllegalArgumentException("유효하지 않은 설문 값입니다.");
        }
    }

    private boolean isValid(int part) {
        return part >= 0 && part <= 3;
    }

    @Transactional
    public List<SurveyAllRP> findAllSurveys(SurveyAllRQ surveyAllRQ, CustomMemberDetails customMemberDetails) {
        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());
        List<Survey> surveys = surveyRepository.findLatestSurvey(member);

        List<Survey> filterSurvey;
        if(surveyAllRQ.year() ==0 && surveyAllRQ.month() == 0) {
            filterSurvey = surveys;
        }
        //월별 조회
        else if (surveyAllRQ.year() == 0) {
            filterSurvey = surveys.stream()
                    .filter(survey->survey.getCreatedDate().getMonthValue() == surveyAllRQ.month())
                    .toList();
        }
        else if(surveyAllRQ.month() == 0) {
            filterSurvey = surveys.stream()
                    .filter(survey -> survey.getCreatedDate().getYear() == surveyAllRQ.year())
                    .toList();
        }
        else{
            filterSurvey = surveys.stream()
                    .filter(survey->survey.getCreatedDate().getYear() == surveyAllRQ.year() &&
                            survey.getCreatedDate().getMonthValue() == surveyAllRQ.month())
                    .toList();
        }
        if(filterSurvey.isEmpty()) {
            throw new IllegalArgumentException("해당 날에 실시한 자가진단이 존재하지 않습니다.");
        }

        return filterSurvey.stream()
                .map(this::convertToSurveyAllRP)
                .toList();
    }

    private SurveyAllRP convertToSurveyAllRP(Survey survey){
        return SurveyAllRP.builder()
                .createdDate(survey.getCreatedDate())
                .score(survey.getScore())
                .build();
    }

}

