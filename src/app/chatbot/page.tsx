"use client";

import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import styles from "./chatbot_style.module.css";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "user",
      content: "요즘 너무 피곤하고 의욕이 없어요...",
    },
    {
      role: "assistant",
      content:
        "안녕! 너의 이야기를 들려줘서 고마워. 너가 우울한 이유를 구체적으로 알 수 있을까? 나와 같이 해결해보자.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");

    const assistantReply = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...updatedMessages] }),
    }).then((res) => res.json());

    setMessages([
      ...updatedMessages,
      { role: "assistant", content: assistantReply.content },
    ]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className={styles.container}>
      <Header title="BUDDY" showBack />

      <section className={styles.chatWindow}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.role === "user" ? styles.userMessage : styles.botMessage
            }
          >
            {msg.content}
          </div>
        ))}
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
