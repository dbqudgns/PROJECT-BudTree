"use client";

import styles from "./style.module.css";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function nickChange() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (nickname.trim() === "") {
      setErrorMessage("변경할 닉네임을 입력해주세요.");
    } else {
      setErrorMessage("");
    }
  }, [nickname]);

  const nicknameComplete = () => {
    router.push("./mainPage");
  };

  return (
    <div className={styles.container}>
      <Header title={"닉네임변경"} showBack />

      <br></br>
      <br></br>

      <div className={styles.content}>
        <div className={styles.inputNickName}>
          <div className={styles.inputnick}>새로운 닉네임을 입력하세요.</div>
          <input
            className={styles.nickSetting}
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.completeButton}
          onClick={nicknameComplete}
          disabled={nickname.trim() === ""}
        >
          완료
        </button>
      </div>
    </div>
  );
}
