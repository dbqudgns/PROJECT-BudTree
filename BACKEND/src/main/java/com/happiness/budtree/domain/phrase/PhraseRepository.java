package com.happiness.budtree.domain.phrase;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface PhraseRepository extends JpaRepository<Phrase, Long> {
    Optional<Phrase> findByCreatedDate(LocalDate createdDate);
}