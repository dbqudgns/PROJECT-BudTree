"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Header from "../../components/Header";
import styles from "./style.module.css";

export default function ChatDetailPage() {
  const router = useRouter();
  const { date } = useParams();
  const rawDate = Array.isArray(date) ? date[0] : date ?? "";
  const [year, month, day] = rawDate.split("-");
  const displayDate = `${Number(month)}월 ${Number(day)}일`;

  const mockMessages = [
    {
      from: "bot",
      text: "안녕? 내 이름은 버드야. 너의 이야기를 들려줄래?",
      avatar: "/chat.png",
    },
    { from: "user", text: "오늘 일이 잘 안 풀려서 조금 우울했어..." },
    {
      from: "bot",
      text: "어떤 일이 있었는지 조금 더 자세하게 말해줄래?",
      avatar: "/chat.png",
    },
    {
      from: "user",
      text: "붕어빵을 사서 집으로 돌아가는 길에 다 떨어뜨려서 하나도 못 먹었어ㅠㅠ",
    },
    {
      from: "bot",
      text: "어떤 일이 있었는지 조금 더 자세하게 말해줄래?",
      avatar: "/chat.png",
    },
    {
      from: "user",
      text: "붕어빵을 사서 집으로 돌아가는 길에 다 떨어뜨려서 하나도 못 먹었어ㅠㅠ",
    },
  ];

  return (
    <div className={styles.container}>
      <Header
        title="대화 내역"
        showBack
        onBack={() => router.push("/chat-history")}
      />

      <div className={styles.dateSection}>
        <p className={styles.dateText}>{displayDate}</p>
        <Image
          src="/4.png"
          alt="나쁨"
          width={80}
          height={80}
          className={styles.moodIcon}
        />
        <p className={styles.moodText}>나쁨</p>
      </div>

      <div className={styles.messages}>
        {mockMessages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.from === "user"
                ? styles.userMessageRow
                : styles.buddyMessageRow
            }
          >
            {msg.avatar && (
              <Image
                src={msg.avatar}
                alt="avatar"
                width={40}
                height={40}
                className={styles.avatar}
              />
            )}
            <div
              className={`${styles.messageBubble} ${
                msg.from === "user" ? styles.userBubble : styles.buddyBubble
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
