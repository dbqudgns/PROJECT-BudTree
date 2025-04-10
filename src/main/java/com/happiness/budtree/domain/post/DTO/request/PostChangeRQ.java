package com.happiness.budtree.domain.post.DTO.request;

import com.happiness.budtree.domain.post.Emotion;
import jakarta.validation.constraints.NotBlank;

public record PostChangeRQ(

        @NotBlank(message = "내용을 작성해주세요")
        String content,

        @NotBlank(message = "감정을 선택해주세요")
        Emotion emotion

) {
}
