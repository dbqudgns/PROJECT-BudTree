"use client";
{
  /* 클라이언트 측에서 실행되도록 함*/
}

import styles from "./style.module.css";
import { useState } from "react";
import Header from "../components/Header";

export default function ChangePwd() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className={styles.container}>
      {/* header */}
      <Header title="비밀번호 변경" showBack />
      <br></br>
      <br></br>

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
