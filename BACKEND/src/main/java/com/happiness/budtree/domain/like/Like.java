package com.happiness.budtree.domain.like;

import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.phrase.Phrase;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "`like`")
public class Like {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "phrase_id")
    private Phrase phrase;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    @Builder
    public Like(Member member, Phrase phrase) {
        this.member = member;
        this.phrase = phrase;
        this.createdDate = LocalDateTime.now();
    }
}