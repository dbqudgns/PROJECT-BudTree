"use client";
import styles from "./style.module.css";
import { useState } from "react";
import Image from "next/image"; // Image 컴포넌트 import
import Header from "../components/Header";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      <Header title="로그인" />
      {/* <div className={styles.StartImage}>
        <Image
          className={styles.LogoImage}
          src="/favicon.png"
          alt="logo"
          width={247}
          height={202}
        />
      </div> */}
      {/* favicon을 src로 사용 */}
      <div className={styles.InputArea}>
        <input
          type="email"
          placeholder="아이디를 입력해주세요."
          className={styles.inputId}
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <br></br>

        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          className={styles.inputpwd}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.ButtonWrapper}>
        <button className={styles.btn}>완료</button>
      </div>
    </div>
  );
}
