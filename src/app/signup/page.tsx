"use client";

import Header from "../components/Header";
import styles from "./style.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import apiRequest from "../util/reissue";

// 1. 아이디를 입력하면 중복확인
// 2. 아이디,닉네임 비밀번호, 비밀번호 확인에서 하나라도 빠질시 인풋창 밑에 경고문 출력해주기
// 3. 비밀번호와 비밀번호 확인 동일한지 check
// 4. 비밀번호 조건문 채우기
// 5. 반응형 check

export default function Signup() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  // 에러 문구 출력 useState()
  const [idError, setIdError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleDuplicateCheck = async () => {
    handleId(); // 강제로 blur 처리

    try {
      const response = await apiRequest.post("member/check", { username: id });

      console.log("중복확인 응답:", response.data);
      if (response.data === 1) {
        setIdError("사용 가능한 아이디입니다.");
      } else {
        setIdError("이미 사용 중인 아이디입니다.");
      }
    } catch (error) {
      console.error("중복확인 에러:", error);
      setIdError("서버 오류가 발생했습니다.");
    }
  };

  const buttonClick = () => {
    router.push("./LoginPage");
  };

  const handleId = () => {
    if (id.trim() === "") setIdError("아이디를 입력해주세요.");
    else setIdError("");
  };

  const handleNickname = () => {
    if (nickname.trim() === "") setNicknameError("닉네임을 입력해주세요.");
    else setNicknameError("");
  };

  const handlePassword = () => {
    if (password.trim() === "") setPasswordError("비밀번호를 입력해주세요.");
    else setPasswordError("");
  };

  const handleConfirmPassword = () => {
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("변경할 비밀번호를 입력해주세요.");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

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

  return (
    <div className={styles.container}>
      <Header title="회원가입" showBack />
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
              onBlur={handleId}
            />
            <button
              className={styles.duplicateCheckBtn}
              onClick={handleDuplicateCheck}
            >
              중복확인
            </button>
          </div>
          {idError && <p className={styles.error}>{idError}</p>}
        </div>

        <div className={styles.inputPassword}>
          <div className={styles.newpwd}>닉네임</div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="닉네임을 입력해주세요."
              className={styles.inputOnly}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onBlur={handleNickname}
            />
          </div>
          {nicknameError && <p className={styles.error}>{nicknameError}</p>}
        </div>

        <div className={styles.inputPassword}>
          <div className={styles.newpwd}>비밀번호</div>
          <div className={styles.inputContainer}>
            <input
              type={passwordType1.type}
              placeholder="비밀번호를 입력하세요."
              className={styles.inputOnly}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePassword}
            />
            <div className={styles.toggleView} onClick={handlePasswordType1}>
              {passwordType1.visible ? (
                <Image src="/eye-off.png" alt="숨기기" width={24} height={24} />
              ) : (
                <Image src="/eye.png" alt="보이기" width={24} height={24} />
              )}
            </div>
          </div>
          {passwordError && <p className={styles.error}>{passwordError}</p>}
        </div>

        <div className={styles.inputPassword}>
          <div className={styles.newpwd}>비밀번호 확인</div>
          <div className={styles.inputContainer}>
            <input
              type={passwordType2.type}
              placeholder="비밀번호를 다시 입력하세요."
              className={styles.inputOnly}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmPassword}
            />
            <div className={styles.toggleView} onClick={handlePasswordType2}>
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

      <div className={styles.footer}>
        <button
          className={styles.btn}
          onClick={buttonClick}
          disabled={
            id.trim() === "" ||
            nickname.trim() === "" ||
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
