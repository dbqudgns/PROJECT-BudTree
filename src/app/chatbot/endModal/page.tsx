"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./endModal.module.css";
import Header from "src/app/components/Header";

export default function EndModalPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/mainPage");
  };

  const handleWriteDiary = () => {
    router.push("/diary");
  };

  return (
    <div className={styles.container}>
      <Header title="BUDDY" showBack />
      <h2 className={styles.title}>
        대화를 마친 후 느낀 감정과 생각이 있나요? <br />
        <span>나만의 일기장에 자유롭게 작성해주세요.</span>
      </h2>
      <div className={styles.imageWrapper}>
        <Image
          src="/book.png"
          alt="diary"
          width={200}
          height={200}
          className={styles.image}
        />
        <Image
          src="/pen.png"
          alt="diary"
          width={80}
          height={80}
          className={styles.imagePen}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.cancelButton} onClick={handleCancel}>
          취소
        </button>
        <button className={styles.writeButton} onClick={handleWriteDiary}>
          일기 작성
        </button>
      </div>
    </div>
  );
}
