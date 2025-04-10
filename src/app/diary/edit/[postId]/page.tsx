"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import Header from "src/app/components/Header";

const EMOTIONS = [
  { id: "very_good", label: "완전 좋음", src: "/1.png" },
  { id: "good", label: "좋음", src: "/2.png" },
  { id: "soso", label: "그럭저럭", src: "/3.png" },
  { id: "bad", label: "나쁨", src: "/4.png" },
  { id: "very_bad", label: "완전 나쁨", src: "/5.png" },
];

export default function DiaryEditPage() {
  const { postId } = useParams();
  const router = useRouter();

  const [date, setDate] = useState("2025년 3월 20일");
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("");
  const [showEmotionModal, setShowEmotionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // TODO: Replace with API fetch
    setContent("하늘이 맑아서 기분이 좋았다...");
    setEmotion("good");
  }, [postId]);

  const handleSave = () => {
    console.log("Updated:", { postId, content, emotion });
    router.push("/diary");
  };

  const handleDelete = () => {
    console.log("Deleted:", postId);
    router.push("/diary");
  };

  return (
    <div className={styles.container}>
      <Header
        title="일기 수정"
        showBack={true}
        onBack={() => router.back()}
        showDeleteButton={true}
        onDelete={() => setShowDeleteModal(true)}
      />

      <main className={styles.main}>
        <img
          src={EMOTIONS.find((e) => e.id === emotion)?.src ?? null}
          alt="emotion"
          className={styles.emojiPreview}
          onClick={() => setShowEmotionModal(true)}
        />
        <p className={styles.header}>
          {EMOTIONS.find((e) => e.id === emotion)?.label}
        </p>

        <div className={styles.dateBox}>
          <strong className={styles.date}>{date}</strong>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={() => router.back()} className={styles.cancelButton}>
            취소
          </button>
          <button onClick={handleSave} className={styles.confirmButton}>
            수정 완료
          </button>
        </div>
      </main>

      {showEmotionModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.emotionGrid}>
              <div className={styles.emotionRow}>
                {EMOTIONS.slice(0, 3).map((e) => (
                  <div
                    key={e.id}
                    className={`${styles.emotionItem} ${
                      emotion === e.id ? styles.selected : ""
                    }`}
                    onClick={() => setEmotion(e.id)}
                  >
                    <img
                      src={e.src}
                      alt={e.label}
                      className={`${styles.emotionimg} ${
                        emotion === e.id ? styles.selected : ""
                      }`}
                    />
                    <span>{e.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.emotionRow}>
                {EMOTIONS.slice(3).map((e) => (
                  <div
                    key={e.id}
                    className={`${styles.emotionItem} ${
                      emotion === e.id ? styles.selected : ""
                    }`}
                    onClick={() => setEmotion(e.id)}
                  >
                    <img
                      src={e.src}
                      alt={e.label}
                      className={`${styles.emotionimg} ${
                        emotion === e.id ? styles.selected : ""
                      }`}
                    />
                    <span className={styles.emotiontext}>{e.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.modalButtons}>
              <button
                onClick={() => setShowEmotionModal(false)}
                className={styles.modalCancel}
              >
                취소
              </button>
              <button
                onClick={() => setShowEmotionModal(false)}
                className={styles.modalConfirm}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContainer}>
            <p className={styles.title}>일기를 삭제하시겠습니까?</p>
            <p>일기를 삭제하면 복구할 수 없습니다.</p>
            <div className={styles.modalButtons}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={styles.modalCancel}
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className={`${styles.modalRemove} ${styles.modalButton}`}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
