package com.happiness.budtree.domain.survey.DTO.request;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

public record SurveyRegisterRQ(
         @Range(min = 0, max = 3)
         @NotNull(message = "필수 입력 사항입니다.")
         Integer part1,
         @Range(min = 0, max = 3)
         @NotNull(message = "필수 입력 사항입니다.")
         Integer part2,
         @Range(min = 0, max = 3)
         @NotNull(message = "필수 입력 사항입니다.")
         Integer part3,
         @Range(min = 0, max = 3)
         @NotNull(message = "필수 입력 사항입니다.")
         Integer part4,
         @Range(min = 0, max = 3)
         @NotNull(message = "필수 입력 사항입니다.")
         Integer part5,
         @Range(min = 0, max = 3)
         @NotNull(message = "필수 입력 사항입니다.")
         Integer part6,
         @Range(min = 0, max = 3)
         @NotNull(message = "필수 입력 사항입니다.")
         Integer part7,
         @Range(min = 0, max = 3)
         @NotNull(message = "필수 입력 사항입니다.")
         Integer part8,
         @Range(min = 0, max = 3)
         @NotNull(message = "필수 입력 사항입니다.")
         Integer part9
) {
}
