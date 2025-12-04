package com.happiness.budtree.domain.like;

import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/like")
@RequiredArgsConstructor
@Tag(name = "좋아요 api", description = "좋아요 관련 기능")
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/create")
    @Operation(summary = "좋아요 생성")
    public ResponseEntity<?> create(@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

        likeService.createLike(customMemberDetails);

        return ResponseEntity.ok(ApiResponse.success("좋아요 생성 완료"));

    }

    @DeleteMapping("/cancel")
    @Operation(summary = "좋아요 취소")
    public ResponseEntity<?> cancel(@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

        likeService.cancelLike(customMemberDetails);

        return ResponseEntity.ok(ApiResponse.success("좋아요 취소 완료"));

    }

}
