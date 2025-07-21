package com.happiness.budtree.util;

import com.happiness.budtree.domain.chatroom.Chatroom;
import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.member.Role;
import com.happiness.budtree.domain.message.Message;
import com.happiness.budtree.domain.message.SenderType;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.concurrent.ThreadLocalRandom;

@Component
@RequiredArgsConstructor
public class InitDB {

    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.dbInit();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;
        private final BCryptPasswordEncoder bCryptPasswordEncoder;

        public void dbInit() {
            Member member = createMember("테스트", "string", "string");
            em.persist(member);

            LocalDateTime chatroom = LocalDateTime.of(2025, 1, 1, 0, 0);

            for (int i = 1; i <= 10000; i++) {
                LocalDateTime createdDate = chatroom.plusDays(i) // 하루씩 증가
                        .plusHours(i % 24) // 시간 증가
                        .plusMinutes(1)
                        .plusSeconds(10)
                        .plusNanos(800_000_000);

                makeChatroomAndMessage(member, createdDate);

            }

        }

        private Member createMember(String name, String username, String password) {
            Member member = Member.builder()
                    .name(name)
                    .username(username)
                    .password(bCryptPasswordEncoder.encode(password))
                    .role(Role.USER)
                    .build();

            return member;
        }

        private void makeChatroomAndMessage(Member member, LocalDateTime createdDate) {
            Chatroom chatroom = Chatroom.builder()
                    .member(member)
                    .createdDate(createdDate)
                    .build();
            em.persist(chatroom);

            for (int i = 1; i < 30; i++) {

                SenderType sender = (i % 2 == 0) ? SenderType.MEMBER : SenderType.BUDDY;
                String content = (sender == SenderType.MEMBER)
                        ? "안녕하세요. 테스트 진행을 위해 더미 데이터를 만들고 있습니다. 저는 오늘 굉장히 우울한 하루를 보냈어요."
                        : "안녕하세요. 테스트 진행을 위해 더미 데이터를 만들고 있습니다. 오늘의 하루는 어떠셨나요?";

                Message message = Message.builder()
                            .chatroom(chatroom)
                            .senderType(SenderType.BUDDY)
                            .content(content)
                            .createdDate(createdDate.plusSeconds(i))
                            .build();
                em.persist(message);

            }
        }
    }
}
