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
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(""); // 현재 비밀번호
  const [currentPasswordTouched, setCurrentPasswordTouched] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const [passwordType1, setPasswordType1] = useState({
    type: "password",
    visible: false,
  });
  const [passwordType2, setPasswordType2] = useState({
    type: "password",
    visible: false,
  });

  // // 현재 비밀번호와 새로운 비밀번호가 동일한지 다른지 체크하기 위함
  const [currentPasswordType, setCurrentPasswordType] = useState({
    type: "password",
    visible: false,
  });

  const handleCurrentPasswordType = () => {
    setCurrentPasswordType((prev) => ({
      type: prev.visible ? "password" : "text",
      visible: !prev.visible,
    }));
  };

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

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    setCurrentPasswordTouched(true);
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
        newPassword: password, // ✅ 새 비밀번호
        verifyPassword: currentPassword, // ✅ 현재 비밀번호
      });

      alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");

      // 기존 로그인 정보 삭제
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("nickname");

      router.push("/loginPage");
    } catch (err: any) {
      console.error("비밀번호 변경 실패:", err);
      alert(err.response?.data?.message || "비밀번호 변경에 실패했습니다.");
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
            password !== confirmPassword ||
            !!passwordError
          }
        >
          {/* 완료 */}
          {isLoading ? "처리 중..." : "완료"}
        </button>
      </div>
    </div>
  );
}
