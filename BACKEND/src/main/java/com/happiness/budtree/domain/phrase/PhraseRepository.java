package com.happiness.budtree.domain.phrase;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface PhraseRepository extends JpaRepository<Phrase, Long> {
    Optional<Phrase> findByCreatedDate(LocalDate createdDate);

    @Lock(LockModeType.PESSIMISTIC_WRITE) // 비관적 락 설정
    @Query("SELECT p FROM Phrase p WHERE p.id = :phrase_id")
    Optional<Phrase> findByIdWithLock(@Param("phrase_id") Long phrase_id);

    @Modifying
    @Query("UPDATE Phrase p SET p.likeCount = p.likeCount + 1 WHERE p.id = :phrase_id")
    void increaseLikeCount(@Param("phrase_id") Long phrase_id);

    @Modifying
    @Query("UPDATE Phrase p SET p.likeCount = p.likeCount - 1 WHERE p.id = :phrase_id")
    void decreaseLikeCount(@Param("phrase_id") Long phrase_id);

}