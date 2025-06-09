package com.happiness.budtree.domain.member.DTO.response;

import lombok.Builder;

@Builder
public record MemberNameRP(
        String name,
        String msg
) {

}
