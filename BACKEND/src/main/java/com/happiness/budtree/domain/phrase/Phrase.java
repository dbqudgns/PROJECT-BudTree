package com.happiness.budtree.domain.phrase;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Entity
@Getter
@Table(name = "phrase")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Phrase {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "phrase_id")
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int likeCount;

    @Column(nullable = false, unique = true)
    private LocalDate createdDate;

    @Builder
    public Phrase(String content) {
        this.content = content;
        this.likeCount = 0;
        this.createdDate = LocalDate.now();
    }
}
