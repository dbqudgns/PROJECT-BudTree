"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import styles from "./chatbot_style.module.css";

export default function ChatPage() {
  const router = useRouter();
  const handleBackToHome = () => router.push("/");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const questionRef = useRef<HTMLDivElement | null>(null);

  const simulateAssistantReply = async (userQuestion: string) => {
    return new Promise<{ content: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          content: `"${userQuestion}"에 대해 이야기해줘서 고마워. 함께 해결해보자! 😊`,
        });
      }, 1000);
    });
  };

  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const results = [
    { question: "일 또는 여가 활동에 흥미를 느끼지 못함", score: 0 },
    { question: "기분이 가라앉고 희망이 없음", score: 1 },
    { question: "잠을 너무 많이 잠", score: 2 },
    { question: "피곤하고 기운이 없음", score: 0 },
    { question: "입맛이 없거나 과식을 함", score: 3 },
    { question: "자신을 실패자라 느낌", score: 1 },
    { question: "집중 어려움", score: 0 },
    { question: "너무 느리거나 너무 들떠 있음", score: 2 },
    { question: "자살 생각", score: 3 },
  ];
  const scoreLabels = [
    "전혀 방해받지 않았다",
    "며칠 동안 방해받았다",
    "7일 이상 방해받았다",
    "거의 매일 방해받았다",
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    const updatedMessages = [...messages, { role: "user", content: input }];

    const assistantReply = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...updatedMessages] }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("응답 오류 발생");
        }
        const data = await res.text();
        try {
          return JSON.parse(data);
        } catch {
          return { content: "아직 서버가 준비되지 않았어요." };
        }
      })
      .catch(() => ({
        content: "현재 서버와 연결할 수 없어요. 나중에 다시 시도해줘!",
      }));

    setMessages([
      ...updatedMessages,
      { role: "assistant", content: assistantReply.content },
    ]);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedQuestion) {
      const sendInitialPrompt = async () => {
        const assistantReply = await simulateAssistantReply(selectedQuestion);

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: assistantReply.content },
        ]);

        setSelectedQuestion(null);
      };

      sendInitialPrompt();
    }
  }, [selectedQuestion]);

  return (
    <main className={styles.container}>
      <Header title="BUDDY" showBack onBack={handleBackToHome} />

      <div className={styles.dateDivider}>
        {new Date().toLocaleDateString("ko-KR", {
          // year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        })}
      </div>

      <div className={styles.botMessageBox}>
        <div className={styles.Profile}>
          <img src="/favicon.png" alt="buddy" />
        </div>
        <div className={styles.botMessageText}>
          <p className={styles.botMessageName}>buddy</p>
          <p className={styles.botMessage}>
            안녕, &lt;닉네임&gt;아!
            <br />
            아래는 자가진단 검사 항목별 점수를 정리한 거야. 나와 이야기하고 싶은
            항목을 선택하면, 내가 상담해주고 함께 해결해 줄게!
          </p>
        </div>
      </div>

      <div className={styles.scoreButtons}>
        {[0, 1, 2, 3].map((score) => (
          <button
            key={score}
            className={styles.scoreButton}
            onClick={() => setSelectedScore(score)}
          >
            {score}점 ({scoreLabels[score]})
          </button>
        ))}
      </div>

      {selectedScore !== null && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (
              questionRef.current &&
              !questionRef.current.contains(e.target as Node)
            ) {
              setSelectedScore(null);
            }
          }}
        >
          <div ref={questionRef} className={styles.questionList}>
            {results
              .filter((q) => q.score === selectedScore)
              .map((q, i) => (
                <p
                  key={i}
                  className={styles.questionItem}
                  onClick={() => {
                    setSelectedQuestion(q.question);
                    setMessages((prev) => [
                      ...prev,
                      {
                        role: "user",
                        content: `저는 "${q.question}"에 대해 이야기하고 싶어요.`,
                      },
                    ]);
                    setSelectedScore(null);
                  }}
                >
                  Q{i + 1}. {q.question}
                </p>
              ))}
          </div>
        </div>
      )}

      <section className={styles.chatWindow}>
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <div key={i} className={styles.userMessage}>
              {msg.content}
            </div>
          ) : (
            <div key={i} className={styles.botMessageBox}>
              <div className={styles.Profile}>
                <img src="/favicon.png" alt="buddy" />
              </div>
              <div className={styles.botMessageText}>
                <p className={styles.botMessageName}>buddy</p>
                <p className={styles.botMessage}>{msg.content}</p>
              </div>
            </div>
          )
        )}
        <div ref={bottomRef} />
      </section>

      <section className={styles.inputSection}>
        <button className={styles.profileBtn}></button>
        <input
          type="text"
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="버디에게 이야기해보세요"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button className={styles.sendBtn} onClick={handleSend}>
          ⬆
        </button>
      </section>
    </main>
  );
}
