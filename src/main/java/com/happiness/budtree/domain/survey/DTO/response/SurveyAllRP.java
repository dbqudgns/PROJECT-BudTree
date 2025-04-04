package com.happiness.budtree.domain.survey.DTO.response;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record SurveyAllRP(
            int score,
            LocalDateTime createdDate
) {
}
