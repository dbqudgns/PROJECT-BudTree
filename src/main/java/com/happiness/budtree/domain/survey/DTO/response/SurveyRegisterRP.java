package com.happiness.budtree.domain.survey.DTO.response;

import lombok.Builder;

@Builder
public record SurveyRegisterRP(
        Long surveyId
) {
}
