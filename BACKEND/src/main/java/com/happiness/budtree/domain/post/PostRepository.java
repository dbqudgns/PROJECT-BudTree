package com.happiness.budtree.domain.post;

import com.happiness.budtree.domain.CursorPaginationSupport;
import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.post.DTO.response.PostAllRP;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long>, CursorPaginationSupport<Post> {

    @Query("SELECT p FROM Post p WHERE p.member = :member ORDER BY p.createdDate DESC, p.postId DESC")
    List<Post> findLatestPosts(@Param("member") Member member);

    @Query("SELECT p FROM Post p " +
            "WHERE p.member.username = :username " +
            "AND (:year = 0 OR FUNCTION('YEAR', p.createdDate) = :year) " +
            "AND (:month = 0 OR FUNCTION('MONTH', p.createdDate) = :month) " +
            "AND (:cursor IS NULL OR p.postId < :cursor) " +
            "ORDER BY p.createdDate DESC")
    Slice<Post> findPostByCursor(@Param("username") String username,
                                 @Param("cursor") Long cursor,
                                 @Param("year") int year,
                                 @Param("month") int month,
                                 Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.member.username = :username ORDER BY p.createdDate DESC, p.postId DESC LIMIT 6")
    List<Post> findSixLatestPosts(@Param("username") String username);

    @Query("SELECT NEW com.happiness.budtree.domain.post.DTO.response.PostAllRP(p.postId, p.emotion, p.createdDate) " +
           "FROM Post p " +
           "WHERE p.member.username = :username " +
           "AND p.emotion = :emotion " +
            "AND (:cursor IS NULL OR p.postId < :cursor) " +
           "ORDER BY p.postId desc")
    Slice<PostAllRP> findPostByCursorAndEmotion(@Param("username") String username,
                                                @Param("cursor") Long cursor,
                                                @Param("emotion") Emotion emotion,
                                                Pageable pageable);

}

