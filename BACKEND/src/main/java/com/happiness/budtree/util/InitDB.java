package com.happiness.budtree.util;

import com.happiness.budtree.domain.chatroom.Chatroom;
import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.member.Role;
import com.happiness.budtree.domain.message.Message;
import com.happiness.budtree.domain.message.SenderType;
import com.happiness.budtree.domain.post.Emotion;
import com.happiness.budtree.domain.post.Post;
import com.happiness.budtree.domain.survey.Level;
import com.happiness.budtree.domain.survey.Survey;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class InitDB {

    private final InitService initService;

    @PostConstruct
    public void init() {
       // initService.dbInit_ChatroomAndMessage();
       // initService.dbInit_Post();
       // initService.dbInit_Survey();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;
        private final BCryptPasswordEncoder bCryptPasswordEncoder;
        private final ReturnMember returnMember;

        public void dbInit_ChatroomAndMessage() {
            Member member = createMember("테스트", "string", "string");
            em.persist(member);

            LocalDateTime chatroom = LocalDateTime.of(2025, 1, 1, 0, 0);

            for (int i = 1; i <= 100000; i++) {
                LocalDateTime createdDate = chatroom.plusDays(i) // 하루씩 증가
                        .plusHours(i % 24) // 시간 증가
                        .plusMinutes(1)
                        .plusSeconds(10)
                        .plusNanos(800_000_000);

                makeChatroomAndMessage(member, createdDate);

            }

        }

        public void dbInit_Post() {

            Member member = returnMember.findMemberByUsernameOrTrow("string");

            LocalDateTime postDate = LocalDateTime.of(2025, 1, 1, 0, 0);

            Emotion[] emotions = Emotion.values();

            for (int i = 1; i <= 500000; i++) {
                LocalDateTime createdDate = postDate.plusDays(i)
                        .plusHours(i % 24)
                        .plusMinutes(1)
                        .plusSeconds(10)
                        .plusNanos(800_000_000);

                Emotion emotion = emotions[(i - 1) % emotions.length]; // emotion 순서대로 할당

                createPost(member, createdDate, emotion);

                if (i % 500 == 0) {
                    em.clear();
                }
            }

        }

        public void dbInit_Survey() {

            Member member = returnMember.findMemberByUsernameOrTrow("string");

            LocalDateTime surveyDate = LocalDateTime.of(2025, 1, 1,0,0);

            Level[] levels = Level.values();

            for (int i = 1; i <= 100; i++) {
                LocalDateTime createdDate = surveyDate.plusDays(i)
                        .plusHours(i % 24)
                        .plusMinutes(1)
                        .plusSeconds(10)
                        .plusNanos(800_000_000);

                Level level = levels[(i - 1) % levels.length];

                createSurvey(member, createdDate, level);

                if (i % 500 == 0) {
                    em.clear();
                }
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

            for (int i = 1; i <= 100; i++) {

                SenderType sender = (i % 2 == 0) ? SenderType.MEMBER : SenderType.BUDDY;
                String content = (sender == SenderType.MEMBER)
                        ? "안녕하세요. 테스트 진행을 위해 더미 데이터를 만들고 있습니다. 저는 오늘 굉장히 우울한 하루를 보냈어요."
                        : "안녕하세요. 테스트 진행을 위해 더미 데이터를 만들고 있습니다. 오늘의 하루는 어떠셨나요?";

                Message message = Message.builder()
                            .chatroom(chatroom)
                            .senderType(sender)
                            .content(content)
                            .createdDate(createdDate.plusSeconds(i))
                            .build();
                em.persist(message);

            }
        }

        private void createPost(Member member, LocalDateTime createdDate, Emotion emotion) {
            Post post = Post.builder()
                    .content("안녕하세요. 테스트 진행을 위해 더미 데이터를 만들고 있습니다. 오늘 저는 우울했지만 맛있는 소고기를 먹어 매우 행복합니다.")
                    .emotion(emotion)
                    .createdDate(createdDate)
                    .member(member)
                    .build();

            em.persist(post);
        }

        private void createSurvey(Member member, LocalDateTime createdDate, Level level) {
            Survey survey = Survey.builder()
                    .part1(1)
                    .part2(1)
                    .part3(1)
                    .part4(1)
                    .part5(2)
                    .part6(2)
                    .part7(3)
                    .part8(3)
                    .part9(4)
                    .score(18)
                    .level(level)
                    .createdDate(createdDate)
                    .member(member)
                    .build();

            em.persist(survey);
        }

    }
}
