package com.happiness.budtree.domain;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.util.StringUtils.*;

// 커서 기반 페이지네이션 전용 공통 클래스
@Repository
@RequiredArgsConstructor
public class CursorPaginationRepository {

    private final JPAQueryFactory queryFactory;

    public <T> Slice<T> applyCursorPaging(EntityPath<T> entity, StringPath usernamePath, NumberPath<Long> idPath, DateTimePath<LocalDateTime> createdAtPath,
                                          String username, Long cursor, int year, int month, Pageable pageable) {
        List<T> result = queryFactory.selectFrom(entity)
                .where(
                        usernameEq(usernamePath, username),
                        cursorLt(idPath, cursor),
                        yearEq(createdAtPath, year),
                        monthEq(createdAtPath, month))
                .limit(pageable.getPageSize() + 1)
                .orderBy(createdAtPath.desc(), idPath.desc())
                .fetch();

        boolean hasNext = result.size() > pageable.getPageSize();
        if (hasNext) result.remove(pageable.getPageSize());

        return new SliceImpl<>(result, pageable, hasNext);
    }

    private BooleanExpression usernameEq(StringPath usernamePath, String username) {
        return hasText(username) ? usernamePath.eq(username) : null;
    }

    private BooleanExpression cursorLt(NumberPath<Long> idPath, Long cursor) {
        return cursor == null ? null : idPath.lt(cursor);
    }

    private BooleanExpression yearEq(DateTimePath<LocalDateTime> createdAtPath, int year) {
        return year == 0 ? null : createdAtPath.year().eq(year);
    }

    private BooleanExpression monthEq(DateTimePath<LocalDateTime> createdAtPath, int month) {
        return month == 0 ? null : createdAtPath.month().eq(month);
    }

    /** Q타입의 필드에 접근하고 쿼리 조건을 만들기 위한 도구
     * EntityPath : 엔티티 전체를 표현하는 경로 객체 ex. QPost.post
     * StringPath : String 타입 필드에 접근하기 위한 경로 ex. QPost.post.content
     * NumberPath : Long, Integer 등 숫자 타입 필드에 접근하는 경로 ex. QPost.post.id
     * DateTimePath : LocalDateTime, Date 같은 날짜/시간 필드에 접근하는 경로 ex. QPost.post.createdAt
     */
}
