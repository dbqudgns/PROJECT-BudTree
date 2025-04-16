"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./emotion.module.css"; // 별도 스타일 파일 생성 필요
import Header from "../components/Header"; // Header 컴포넌트 경로에 맞게 수정

const emotions = [
  { label: "완전 좋음", value: "EXCELLENT", icon: "/1.png" },
  { label: "좋음", value: "GOOD", icon: "/2.png" },
  { label: "그럭저럭", value: "SOSO", icon: "/3.png" },
  { label: "나쁨", value: "BAD", icon: "/4.png" },
  { label: "완전 나쁨", value: "TERRIBLE", icon: "/5.png" },
];

export default function EmotionSelectPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (emotion: string) => {
    setSelectedEmotion((prev) => (prev === emotion ? null : emotion));
  };

  const handleComplete = () => {
    if (!selectedEmotion) return;
    // 이후 API 호출 혹은 저장 처리
    router.push("/tree"); // 다음 화면 경로로 이동
  };

  return (
    <main className={styles.container}>
      <Header title="감정선택" showBack />
      <p className={styles.title}>
        일기장 작성과 버디와 대화 이후
        <br />
        자신의 변화된 감정을 선택해주세요!
      </p>

      <div className={styles.gridTop}>
        {emotions.slice(0, 3).map((emo) => (
          <div
            key={emo.value}
            className={styles.emotionItemWrapper}
            onClick={() => handleSelect(emo.value)}
          >
            <div
              className={`${styles.emojiWrapper} ${
                selectedEmotion === emo.value ? styles.selected : ""
              }`}
            >
              <Image
                className={styles.emoji}
                src={emo.icon}
                alt={emo.label}
                width={70}
                height={70}
              />
            </div>
            <span className={styles.emojiLabel}>{emo.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.gridBottom}>
        {emotions.slice(3).map((emo) => (
          <div
            key={emo.value}
            className={styles.emotionItemWrapper}
            onClick={() => handleSelect(emo.value)}
          >
            <div
              className={`${styles.emojiWrapper} ${
                selectedEmotion === emo.value ? styles.selected : ""
              }`}
            >
              <Image
                className={styles.emoji}
                src={emo.icon}
                alt={emo.label}
                width={70}
                height={70}
              />
            </div>
            <span className={styles.emojiLabel}>{emo.label}</span>
          </div>
        ))}
      </div>

      <button
        className={styles.completeButton}
        onClick={handleComplete}
        disabled={!selectedEmotion}
      >
        완료
      </button>
    </main>
  );
}
