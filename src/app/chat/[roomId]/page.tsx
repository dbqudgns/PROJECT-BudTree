"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../components/Header";
import apiRequest from "../../util/reissue";
import styles from "./style.module.css";

interface ChatMessage {
  sender: "BUDDY" | "MEMBER";
  content: string;
  createdDate: string;
}

interface ChatResponse {
  status: number;
  message: ChatMessage[];
}

export default function ChatDetailPage() {
  const router = useRouter();
  const { roomId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const firstDate = messages[0]?.createdDate;
  const displayDate = firstDate
    ? (() => {
        const d = new Date(firstDate);
        const week = ["일", "월", "화", "수", "목", "금", "토"];
        return `${d.getMonth() + 1}월 ${d.getDate()}일 ${week[d.getDay()]}요일`;
      })()
    : "";

  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const response = await apiRequest.get<ChatResponse>(
          `/chatroom/${roomId}`
        );
        if (response.status === 200 && Array.isArray(response.data.message)) {
          const ordered = [...response.data.message].reverse();
          setMessages(ordered);
          setError(null);
        } else {
          setMessages([]);
        }
      } catch (err: any) {
        const message = err?.response?.data?.message;
        setMessages([]);
        setError(message || "대화 조회 중 오류가 발생했습니다.");
        console.error("채팅 조회 실패:", err);
      }
    };

    fetchMessages();
  }, [roomId]);
  return (
    <div className={styles.container}>
      <Header
        title="BUDDY"
        showBack
        onBack={() => router.push("/chat-history")}
      />

      <div className={styles.messages}>
        <div className={styles.dateRow}>
          <span className={styles.dateText}>{displayDate}</span>
        </div>

        {error && <p className={styles.dateText}>{error}</p>}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.sender === "MEMBER"
                ? styles.userMessageRow
                : styles.buddyMessageRow
            }
          >
            {msg.sender === "BUDDY" && (
              <div className={styles.buddyProfile}>
                <Image
                  src="/chat.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
                <div className={styles.buddyName}>BUDDY</div>
              </div>
            )}
            <div
              className={`${styles.messageBubble} ${
                msg.sender === "MEMBER" ? styles.userBubble : styles.buddyBubble
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
