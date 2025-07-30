package com.happiness.budtree.domain.post;

import com.happiness.budtree.domain.CursorPaginationRepository;
import com.happiness.budtree.domain.CursorPaginationSupport;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import static com.happiness.budtree.domain.post.QPost.*;

@RequiredArgsConstructor
public class PostRepositoryImpl implements CursorPaginationSupport<Post> {

    private final CursorPaginationRepository cursorPaginationRepository;

    @Override
    public Slice<Post> findByCursor(String username, Long cursor, int year, int month, Pageable pageable) {
        return cursorPaginationRepository.applyCursorPaging(post, post.member.username, post.postId, post.createdDate,
                                                            username, cursor, year, month, pageable);
    }
}
