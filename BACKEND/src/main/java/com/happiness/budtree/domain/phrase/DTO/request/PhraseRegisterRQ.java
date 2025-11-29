package com.happiness.budtree.domain.phrase.DTO.request;

import jakarta.validation.constraints.NotBlank;

public record PhraseRegisterRQ(

        @NotBlank(message = "내용을 작성해주세요")
        String content

) {
}
