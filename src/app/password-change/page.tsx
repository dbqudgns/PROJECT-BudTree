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
  const [passwordTouched, setPasswordTouched] = useState(false);

  const router = useRouter();

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
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (confirmPassword && value !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password && password !== value) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  };

  const passwordCheckBtn = () => {
    router.push("./mainPage");
  };
  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    if (password.trim() === "") {
      setErrorMessage("변경할 비밀번호를 입력해주세요.");
    } else if (confirmPassword && password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
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
              className={`${styles.inputpwd} ${
                errorMessage ? styles.errorBorder : ""
              }`}
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />

            <div className={styles.toggleView1} onClick={handlePasswordType1}>
              {passwordType1.visible ? (
                <Image src="/eye-off.png" alt="숨기기" width={24} height={24} />
              ) : (
                <Image src="/eye.png" alt="보이기" width={24} height={24} />
              )}
            </div>
          </div>
          {passwordTouched && password.trim() === "" && (
            <p className={styles.error}>변경할 비밀번호를 입력해주세요.</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className={styles.inputPassword2}>
          <div className={styles.newpwd}>비밀번호를 다시 입력해주세요.</div>
          <div className={styles.inputWrapper}>
            <input
              type={passwordType2.type}
              placeholder="비밀번호를 다시 입력해주세요."
              className={`${styles.inputpwd} ${
                errorMessage && confirmPassword.trim() === ""
                  ? styles.errorBorder
                  : ""
              }`}
              id="write"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <div className={styles.toggleView2} onClick={handlePasswordType2}>
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
          disabled={
            password.trim() === "" ||
            confirmPassword.trim() === "" ||
            password !== confirmPassword
          }
        >
          완료
        </button>
      </div>
    </div>
  );
}
