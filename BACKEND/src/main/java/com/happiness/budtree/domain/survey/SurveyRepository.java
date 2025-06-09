package com.happiness.budtree.domain.survey;

import com.happiness.budtree.domain.member.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
    @Query("SELECT p FROM Survey p WHERE p.member = :member ORDER BY p.createdDate DESC, p.surveyId DESC")
    List<Survey> findLatestSurvey(@Param("member") Member member);
}
