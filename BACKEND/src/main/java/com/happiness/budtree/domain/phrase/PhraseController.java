package com.happiness.budtree.domain.phrase;

import com.happiness.budtree.domain.phrase.DTO.request.PhraseRegisterRQ;
import com.happiness.budtree.domain.phrase.DTO.response.TodayPhrase;
import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/phrase")
@RequiredArgsConstructor
@Tag(name = "글귀 api", description = "글귀 관련 기능")
public class PhraseController {

    private final PhraseService phraseService;

    @PostMapping("/create")
    @Operation(summary = "글귀 저장")
    public ResponseEntity<?> create(@RequestBody PhraseRegisterRQ registerRQ) {

        phraseService.createPhrase(registerRQ);

        return ResponseEntity.ok(ApiResponse.success("글귀가 저장되었습니다."));
    }

    @GetMapping("/today")
    @Operation(summary = "오늘의 글귀 조회")
    public ResponseEntity<?> getPhrase(@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

        TodayPhrase todayPhrase = phraseService.getPhrase(customMemberDetails);

        return ResponseEntity.ok(ApiResponse.success(todayPhrase));
    }

}
