package com.happiness.budtree.domain.like;

import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.phrase.Phrase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LikeRepository extends JpaRepository<Like, Long> {

    int countByPhrase(Phrase phrase);

    boolean existsByMemberAndPhrase(Member member, Phrase phrase);

    @Modifying
    @Query("DELETE FROM Like l WHERE l.member = :member AND l.phrase = :phrase")
    void deleteByMemberAndPhrase(@Param("member") Member member, @Param("phrase") Phrase phrase);
}