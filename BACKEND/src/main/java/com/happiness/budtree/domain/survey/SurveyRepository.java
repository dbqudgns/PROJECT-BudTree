package com.happiness.budtree.domain.survey;

import com.happiness.budtree.domain.CursorPaginationSupport;
import com.happiness.budtree.domain.member.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SurveyRepository extends JpaRepository<Survey, Long>, CursorPaginationSupport<Survey> {
    @Query("SELECT p FROM Survey p WHERE p.member = :member ORDER BY p.createdDate DESC, p.surveyId DESC")
    List<Survey> findLatestSurvey(@Param("member") Member member);

    @Query("SELECT s FROM Survey s " +
           "WHERE s.member.username = :username " +
           "AND (:year = 0 OR FUNCTION('YEAR', s.createdDate) = :year) " +
           "AND (:month = 0 OR FUNCTION('MONTH', s.createdDate) = :month) " +
           "AND (:cursor IS NULL OR s.surveyId < :cursor) " +
           "ORDER BY s.createdDate DESC")
    Slice<Survey> findSurveyByCursor(@Param("username") String username,
                                     @Param("cursor") Long cursor,
                                     @Param("year") int year,
                                     @Param("month") int month,
                                     Pageable pageable);
}
