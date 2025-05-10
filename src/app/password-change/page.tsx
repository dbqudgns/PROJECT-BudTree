"use client";

import styles from "./style.module.css";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import apiRequest from "../util/reissue";

export default function ChangePwd() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false); // 포커스를 벗어나면 true로 바뀜
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password && password !== value) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    if (password.trim() === "") {
      setConfirmPasswordError("변경할 비밀번호를 입력해주세요.");
    } else if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const passwordCheckBtn = async () => {
    try {
      setIsLoading(true);

      // 현재 비밀번호와 새 비밀번호 모두 전송
      await apiRequest.patch("/member/change-password", {
        newPassword: password,
        verifyPassword: confirmPassword,
      });

      alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해 주세요.");
      localStorage.removeItem("userName");
      localStorage.removeItem("id");
      localStorage.removeItem("token");

      router.push("/LoginPage");
    } catch (err: any) {
      console.error(
        "비밀번호 변경 실패:",
        err.response?.data?.message || err.message
      );

      // 만약 토큰 만료로 인한 에러(401)면 로그인 페이지로 보내기
      if (err.response?.status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      } else {
        alert(err.response?.data?.message || "비밀번호 변경에 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
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
                confirmPasswordError ? styles.errorBorder : ""
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
                confirmPasswordError && confirmPassword.trim() === ""
                  ? styles.errorBorder
                  : ""
              }`}
              id="write"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <div className={styles.toggleView2} onClick={handlePasswordType2}>
              {passwordType2.visible ? (
                <Image src="/eye-off.png" alt="숨기기" width={24} height={24} />
              ) : (
                <Image src="/eye.png" alt="보이기" width={24} height={24} />
              )}
            </div>
          </div>
          {confirmPasswordError && (
            <p className={styles.error}>{confirmPasswordError}</p>
          )}
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
          {/* 완료 */}
          {isLoading ? "처리 중..." : "완료"}
        </button>
      </div>
    </div>
  );
}
