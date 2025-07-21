package com.happiness.budtree.domain.chatroom;

import com.happiness.budtree.domain.member.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Table(name = "chatroom")
@Getter
@Builder
@AllArgsConstructor
public class Chatroom {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    public Chatroom() {}

    public Chatroom(Member member) {
        this.member = member;
        this.createdDate = LocalDateTime.now();
    }

    // 성능 테스트용
    public Chatroom(Member member, LocalDateTime createdDate) {
        this.member = member;
        this.createdDate = createdDate;
    }

}
