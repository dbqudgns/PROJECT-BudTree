package com.happiness.budtree.domain.survey;

import com.happiness.budtree.domain.member.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "survey")
public class Survey {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long surveyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    private int part1;

    @Column(nullable = false)
    private int part2;

    @Column(nullable = false)
    private int part3;

    @Column(nullable = false)
    private int part4;

    @Column(nullable = false)
    private int part5;

    @Column(nullable = false)
    private int part6;

    @Column(nullable = false)
    private int part7;

    @Column(nullable = false)
    private int part8;

    @Column(nullable = false)
    private int part9;

    @Column(nullable = false)
    private int score;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Level level;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    public Survey() {
    }

    @Builder
    public Survey(Member member, int part1, int part2, int part3, int part4, int part5, int part6, int part7, int part8, int part9, int score, Level level, LocalDateTime createdDate) {
        this.member = member;
        this.part1 = part1;
        this.part2 = part2;
        this.part3 = part3;
        this.part4 = part4;
        this.part5 = part5;
        this.part6 = part6;
        this.part7 = part7;
        this.part8 = part8;
        this.part9 = part9;
        this.score = score;
        this.level = level;
        this.createdDate = LocalDateTime.now();
    }
}
