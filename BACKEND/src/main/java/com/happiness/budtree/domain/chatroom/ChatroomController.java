package com.happiness.budtree.domain.chatroom;

import com.happiness.budtree.domain.chatroom.DTO.request.ChatroomAllRQ;
import com.happiness.budtree.domain.chatroom.DTO.request.ChatroomPartRQ;
import com.happiness.budtree.domain.chatroom.DTO.request.ChatroomQueryRQ;
import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/chatroom")
@RequiredArgsConstructor
@Tag(name = "채팅방 api", description = "채팅방/GPT 관련 기능")
public class ChatroomController {

    private final ChatroomService chatroomService;

    @PostMapping("/create")
    @Operation(summary = "첫 대화 시 채팅방 생성")
    public ResponseEntity<?> createChatroom(@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        return ResponseEntity.ok(ApiResponse.success(chatroomService.createChatroom(customMemberDetails)));
    }

    @PostMapping("/chat/survey/{roomId}")
    @Operation(summary = "자가진단 항목 전용 챗봇 요청")
    public ResponseEntity<?> getChatBySurvey(@PathVariable("roomId") Long roomId, @RequestBody @Valid ChatroomPartRQ chatroomPartRQ,
                                             @AuthenticationPrincipal CustomMemberDetails customMemberDetails) throws AccessDeniedException {
        return ResponseEntity.ok(ApiResponse.success(chatroomService.getChatBySurvey(roomId, chatroomPartRQ, customMemberDetails)));
    }

    @PostMapping("/chat/{roomId}")
    @Operation(summary = "챗봇 요청")
    public ResponseEntity<?> getChatByQuery(@PathVariable("roomId") Long roomId, @RequestBody @Valid ChatroomQueryRQ chatroomQueryRQ,
                                            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) throws AccessDeniedException {
        return ResponseEntity.ok(ApiResponse.success(chatroomService.getChatByQuery(roomId, chatroomQueryRQ.query(), customMemberDetails)));
    }

    @PostMapping("/all")
    @Operation(summary = "대화 내역 전체 조회")
    public ResponseEntity<?> getAllChatroom(@RequestBody @Valid ChatroomAllRQ chatroomAllRQ,
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        return ResponseEntity.ok(ApiResponse.success(chatroomService.chatroomAllRP(chatroomAllRQ, customMemberDetails)));
    }

    @GetMapping("/all-pagination")
    @Operation(summary = "대화 내역 전체 조회 - 커서 페이지네이션")
    public ResponseEntity<?> getAllChatroomByCursor(@RequestParam(value = "cursor", required = false) Long cursor,
                                            @RequestParam(value = "size") int size,
                                            @RequestParam(value = "year", required = false) Integer year,
                                            @RequestParam(value = "month", required = false) Integer month,
                                            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        return ResponseEntity.ok(ApiResponse.success(chatroomService.chatroomAllRPByCursor(cursor, size, year, month, customMemberDetails)));
    }


    @GetMapping("/{roomId}")
    @Operation(summary = "특정 대화 내역 조회")
    public ResponseEntity<?> getChatroomMessages(@PathVariable("roomId") Long roomId,
                                                 @AuthenticationPrincipal CustomMemberDetails customMemberDetails) throws AccessDeniedException {
        return ResponseEntity.ok(ApiResponse.success(chatroomService.chatroomMessages(roomId, customMemberDetails)));
    }

    @GetMapping("/pagination/{roomId}")
    @Operation(summary = "특정 대화 내역 조회 - 커서 페이지네이션")
    public ResponseEntity<?> getChatroomMessagesByCursor(@PathVariable("roomId") Long roomId,
                                                         @RequestParam(value = "cursor", required = false) Long cursor,
                                                         @RequestParam(value = "size") int size,
                                                         @AuthenticationPrincipal CustomMemberDetails customMemberDetails) throws AccessDeniedException {
        return ResponseEntity.ok(ApiResponse.success(chatroomService.chatroomMessagesByCursor(roomId, cursor, size, customMemberDetails)));

    }

}
