package com.happiness.budtree.domain.phrase.DTO.response;

public record TodayPhrase(
        Long phrase_id,
        String content,
        int likeCount
) {
}