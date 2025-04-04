package com.happiness.budtree.domain.survey.DTO.request;

import jakarta.validation.constraints.NotNull;

public record SurveyAllRQ(

        @NotNull(message = "전체 조회시 0을 보내주세요.")
        Integer year,

        @NotNull(message = "전체 조회시 0을 보내주세요.")
        Integer month
) {
}
