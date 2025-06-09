package com.happiness.budtree.domain.survey;

import com.happiness.budtree.domain.survey.DTO.request.SurveyAllRQ;
import com.happiness.budtree.domain.survey.DTO.request.SurveyRegisterRQ;
import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/survey")
@RequiredArgsConstructor
@Tag(name = "자가진단 api", description = "자가진단 관련 기능")
public class SurveyController {
    private final SurveyService surveyService;

    @PostMapping("/save")
    @Operation(summary = "자가진단 검사결과 저장")
    public ResponseEntity<?> save(
            @Valid @RequestBody SurveyRegisterRQ surveyRegisterRQ,
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        return ResponseEntity.ok(ApiResponse.success(surveyService.save(surveyRegisterRQ, customMemberDetails))
        );

    }

    @PostMapping("/all")
    @Operation (summary = "전체 자가진단 결과조회")
    public ResponseEntity<?> findAll(@RequestBody SurveyAllRQ surveyAllRQ,
                                     @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        return ResponseEntity.ok(ApiResponse.success(surveyService.findAllSurveys(surveyAllRQ, customMemberDetails)));
    }

}
