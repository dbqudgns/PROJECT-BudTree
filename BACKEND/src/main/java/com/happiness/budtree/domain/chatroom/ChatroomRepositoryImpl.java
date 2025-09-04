package com.happiness.budtree.domain.chatroom;

import com.happiness.budtree.domain.CursorPaginationRepository;
import com.happiness.budtree.domain.CursorPaginationSupport;
import com.happiness.budtree.domain.post.Emotion;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import static com.happiness.budtree.domain.chatroom.QChatroom.*;

@RequiredArgsConstructor
public class ChatroomRepositoryImpl implements CursorPaginationSupport<Chatroom> {

    private final CursorPaginationRepository cursorPaginationRepository;

    @Override
    public Slice<Chatroom> findByCursor(String username, Long cursor, int year, int month, Pageable pageable) {
        return cursorPaginationRepository.applyCursorPaging(chatroom, chatroom.member.username, chatroom.roomId, chatroom.createdDate,
                username, cursor, year, month, pageable);
    }

    @Override
    public Slice<Chatroom> findByEmotionAndCursor(String username, Long cursor, Emotion emotion, Pageable pageable) {
        return null;
    }
}
