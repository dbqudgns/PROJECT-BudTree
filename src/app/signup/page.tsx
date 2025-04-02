"use client";
{
  /* 클라이언트 측에서 실행되도록 함*/
}

import Header from "../components/Header";
import styles from "./style.module.css";
import { useState } from "react";

export default function Signup() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");

  const handleDuplicateCheck = () => {
    // Here you would implement the actual duplicate check logic
    // For example, making an API call to check if the ID exists
    alert(`'${id}' 아이디 중복 확인 중`);
  };

  const buttonClick = () => {};

  return (
    <div className={styles.container}>
      <Header title="회원가입" />
      <div className={styles.inputArea}>
        <div className={styles.inputId}>
          <div className={styles.newId}>아이디</div>
          <div className={styles.idInputContainer}>
            <input
              type="email"
              placeholder="아이디를 입력해주세요."
              className={styles.inputid__}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button
              className={styles.duplicateCheckBtn}
              onClick={handleDuplicateCheck}
            >
              중복확인
            </button>
          </div>
        </div>

        <div className={styles.inputPassword}>
          <div className={styles.newpwd}>닉네임</div>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            className={styles.inputpwd}
          />
        </div>

        <div className={styles.inputPassword}>
          <div className={styles.newpwd}>비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호 (8자 이상, 문자/숫자/기호 사용)"
            className={styles.inputpwd}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.inputPassword}>
          <div className={styles.newpwd}>비밀번호 확인</div>
          <input
            type="password"
            placeholder="비밀번호 확인"
            className={styles.inputpwd}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.footer}>
          <button className={styles.btn} onClick={buttonClick}>
            완료
          </button>
        </div>
      </div>

      {/* footer */}
    </div>
  );
}
