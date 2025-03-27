"use client";
{
  /* 클라이언트 측에서 실행되도록 함*/
}

import styles from "./style.module.css";
import { useState } from "react";

export default function ChangePwd() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className={styles.container}>
      {/* header */}
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
        <div className={styles.headerTitle}>비밀번호 변경</div>
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputPassword1}>
          <div className={styles.newpwd}>새로운 비밀번호를 입력해주세요.</div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className={styles.inputpwd}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.inputPassword2}>
          <div className={styles.newpwd}>비밀번호를 다시 입력해주세요.</div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className={styles.inputpwd}
          />
        </div>
      </div>

      {/* footer */}
      <div className={styles.footer}>
        <button className={styles.btn}>완료</button>
      </div>
    </div>
  );
}
