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
            Member member = createMember("테스트", "test", "test1q2w@");
            em.persist(member);

            LocalDateTime start = LocalDateTime.of(2020, 1, 1, 0, 0);
            LocalDateTime end = LocalDateTime.of(2025, 1, 1, 0, 0);

            for (int i = 1; i <= 100; i++)
                makeChatroomAndMessage(member, getRandomDateTime(start, end));

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

        private LocalDateTime getRandomDateTime(LocalDateTime start, LocalDateTime end) {
            // 한국 시간대 (UTC+9) 기준으로 변환
            long startEpoch = start.toEpochSecond(ZoneOffset.ofHours(9));
            long endEpoch = end.toEpochSecond(ZoneOffset.ofHours(9));
            long randomEpoch = ThreadLocalRandom.current().nextLong(startEpoch, endEpoch);

            return LocalDateTime.ofEpochSecond(randomEpoch, 0, ZoneOffset.ofHours(9));

        }

        private void makeChatroomAndMessage(Member member, LocalDateTime createdDate) {
            Chatroom chatroom = Chatroom.builder()
                    .member(member)
                    .createdDate(createdDate)
                    .build();
            em.persist(chatroom);

            boolean nextCnt = true;
            for (int i = 1; i < 30; i++) {

                Message message;
                if (nextCnt) {
                    message = Message.builder()
                            .chatroom(chatroom)
                            .content("안녕하세요. 테스트 진행을 위해 더미 데이터를 만들고 있습니다. 오늘의 하루는 어떠셨나요 ? 상담하시고 싶은 내용이 있으시다면 편하게 버디에게 말씀해주세요!")
                            .senderType(SenderType.BUDDY)
                            .createdDate(createdDate.plusMinutes(1).plusSeconds(10))
                            .build();

                    nextCnt = false;
                }
                else {
                    message = Message.builder()
                            .chatroom(chatroom)
                            .content("안녕하세요. 테스트 진행을 위해 더미 데이터를 만들고 있습니다. 저는 오늘 굉장히 우울한 하루를 보냈어요. 요즘 되는일이 하나도 없고 인간관계도 어렵네요.")
                            .senderType(SenderType.MEMBER)
                            .createdDate(createdDate.plusMinutes(1).plusSeconds(10))
                            .build();
                    nextCnt = true;
                }
                em.persist(message);
            }
        }
    }
}
