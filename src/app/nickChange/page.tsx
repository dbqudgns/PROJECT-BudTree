"use client";

import styles from "./style.module.css";
import Image from "next/image";

export default function nickChange() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.arrow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </div>
        <div className={styles.headerTitle}>닉네임 변경</div>
      </div>

      <div className={styles.inputNickName}>
        <div className={styles.inputnick}>새로운 닉네임을 입력하세요.</div>
        <input className={styles.nickSetting} placeholder="닉네임" />
      </div>
    </div>
  );
}
