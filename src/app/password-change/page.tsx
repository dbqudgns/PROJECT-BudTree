"use client";

import styles from "./style.module.css";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ 올바른 import

export default function ChangePwd() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (password.trim() === "") {
      setErrorMessage("비밀번호를 입력해주세요.");
    }
    if (confirmPassword.trim() === "") {
      setErrorMessage("비밀번호를 다시 입력해주세요.");
    } else {
      setErrorMessage("");
    }
  }, [password]);

  const [passwordType1, setPasswordType1] = useState({
    type: "password",
    visible: false,
  });
  const [passwordType2, setPasswordType2] = useState({
    type: "password",
    visible: false,
  });
  const handlePasswordType1 = () => {
    setPasswordType1((prev) => ({
      type: prev.visible ? "password" : "text",
      visible: !prev.visible,
    }));
  };

  const handlePasswordType2 = () => {
    setPasswordType2((prev) => ({
      type: prev.visible ? "password" : "text",
      visible: !prev.visible,
    }));
  };

  const passwordCheckBtn = () => {
    router.push("./mainPage");
  };

  return (
    <div className={styles.container}>
      {/* header */}
      <Header title="비밀번호 변경" showBack />
      <br />
      <br />

      <div className={styles.inputArea}>
        {/* 새 비밀번호 */}
        <div className={styles.inputPassword1}>
          <div className={styles.newpwd}>새로운 비밀번호를 입력해주세요.</div>
          <div className={styles.inputWrapper}>
            <input
              type={passwordType1.type}
              placeholder="비밀번호를 입력해주세요."
              className={styles.inputpwd}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (password && password !== e.target.value) {
                  setErrorMessage("비밀번호가 일치하지 않습니다.");
                } else {
                  setErrorMessage("");
                }
              }}
            />
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}

            <div className={styles.toggleView} onClick={handlePasswordType1}>
              {passwordType1.visible ? (
                <Image src="/eye-off.png" alt="숨기기" width={24} height={24} />
              ) : (
                <Image src="/eye.png" alt="보이기" width={24} height={24} />
              )}
            </div>
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div className={styles.inputPassword2}>
          <div className={styles.newpwd}>비밀번호를 다시 입력해주세요.</div>
          <div className={styles.inputWrapper}>
            <input
              type={passwordType2.type}
              placeholder="비밀번호를 다시 입력해주세요."
              className={styles.inputpwd}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPassword && e.target.value !== confirmPassword) {
                  setErrorMessage("비밀번호가 일치하지 않습니다.");
                } else {
                  setErrorMessage("");
                }
              }}
            />
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <div className={styles.toggleView} onClick={handlePasswordType2}>
              {passwordType2.visible ? (
                <Image src="/eye-off.png" alt="숨기기" width={24} height={24} />
              ) : (
                <Image src="/eye.png" alt="보이기" width={24} height={24} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className={styles.footer}>
        <button
          className={styles.btn}
          onClick={passwordCheckBtn}
          disabled={password.trim() === ""}
        >
          완료
        </button>
      </div>
    </div>
  );
}
