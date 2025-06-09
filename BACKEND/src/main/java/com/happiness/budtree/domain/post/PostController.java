package com.happiness.budtree.domain.post;


import com.happiness.budtree.domain.post.DTO.request.PostAllRQ;
import com.happiness.budtree.domain.post.DTO.request.PostChangeRQ;
import com.happiness.budtree.domain.post.DTO.request.PostRegisterRQ;
import com.happiness.budtree.domain.post.DTO.response.PostEmotionRP;
import com.happiness.budtree.domain.post.DTO.response.PostMessageRP;
import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
@Tag(name = "일기장 api", description = "일기장 관련 기능")
public class PostController {
    private final PostService postService;



    @PostMapping("/create")
    @Operation(summary = "일기장 저장")
    public ResponseEntity<?> create(@RequestBody PostRegisterRQ registerRQ ,
                                    @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

        postService.createPost(registerRQ,customMemberDetails);

        return ResponseEntity.ok(ApiResponse.success("일기장이 저장되었습니다."));
    }


    @PatchMapping("/update/{postId}")
    @Operation(summary = "일기장 수정")
    public ResponseEntity<?> update(@PathVariable Long postId,
                            @RequestBody @Valid PostChangeRQ changeRQ,
                            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        postService.updatePost(postId,changeRQ,customMemberDetails);
        return ResponseEntity.ok(ApiResponse.success("일기장이 수정되었습니다."));
    }


    @GetMapping("/find-post/{postId}")
    @Operation(summary = "특정 일기장 조회")
    public ResponseEntity<?> findPostById(@PathVariable("postId") Long postId,
                                          @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        PostMessageRP postMessageRP = postService.findByPostId(postId, customMemberDetails);
        return ResponseEntity.ok(ApiResponse.success(postMessageRP));
    }


    @GetMapping("/find-emotion")
    @Operation(summary = "최근 6개의 감정 상태반환(열매)")
    public ResponseEntity<?> findEmotionByPostId(@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        List<PostEmotionRP> postEmotionRPS = postService.findLatestSixEmotions(customMemberDetails);
        return ResponseEntity.ok(ApiResponse.success(postEmotionRPS));
    }

    @PostMapping("/all")
    @Operation(summary = "전체 조회")
    public ResponseEntity<?> getAllPosts(@RequestBody PostAllRQ postAllRQ,
                                    @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        return ResponseEntity.ok(ApiResponse.success(postService.findAllPosts(postAllRQ,customMemberDetails)));

    }
    

    @DeleteMapping("/delete/{postId}")
    @Operation(summary = "일기장 삭제")
    public ResponseEntity<?> delete(@PathVariable Long postId,
                                    @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        postService.deletePost(postId,customMemberDetails);
        return ResponseEntity.ok(ApiResponse.success("일기장이 삭제되었습니다."));
    }
}
