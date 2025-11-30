package com.happiness.budtree.domain.phrase.DTO.response;

public record TodayPhrase(
        Long phraseId,
        String content,
        int likeCount
) {
}
