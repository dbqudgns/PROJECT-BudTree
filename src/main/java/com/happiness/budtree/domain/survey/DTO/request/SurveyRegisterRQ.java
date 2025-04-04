package com.happiness.budtree.domain.survey.DTO.request;

//각 항목별 점수를 입력 받자
public record SurveyRegisterRQ(
         int part1,
         int part2,
         int part3,
         int part4,
         int part5,
         int part6,
         int part7,
         int part8,
         int part9
) {
}
