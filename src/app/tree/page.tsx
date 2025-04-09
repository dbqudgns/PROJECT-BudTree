"use client";

import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import styles from "./tree.module.css"; // CSS 모듈 추가

export default function Page() {
  const searchParams = useSearchParams();
  const selectedEmoji = searchParams.get("emoji");

  const dummyEmojis = ["1", "2", "3", "4", "5", "1"];

  const positions = [
    { top: "21vh", left: "19vh" },
    { top: "25%", left: "60%" },
    { top: "35%", left: "30%" },
    { top: "45%", left: "55%" },
    { top: "35%", left: "70%" },
    { top: "50%", left: "40%" },
  ];

  return (
    <div className={styles.container}>
      <Header title="하루나무" showBack />
      <img src="/treeimg.png" alt="tree" className={styles.treeImage} />
      {dummyEmojis.map((emoji, index) => (
        <img
          key={index}
          src={`/${emoji}.png`}
          alt={`emotion-${index}`}
          className={styles.emotionIcon}
          style={{
            top: positions[index].top,
            left: positions[index].left,
          }}
        />
      ))}
      <div className={styles.buddyContainer}>
        <div className={styles.buddyImageWrapper}>
          <img
            src="/bud.png"
            alt="buddy"
            className={styles.buddyImage}
            onClick={() => (window.location.href = "/diary")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={styles.buddySpeechBubble}>
          <p>
            오늘의 이야기를 작성하여 <br />
            나무를 꾸며보아요! <br />
            일기를 작성하고 싶다면 <br />
            저를 눌러주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
