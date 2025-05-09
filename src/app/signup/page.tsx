"use client";

// 1. 아이디를 입력하면 중복확인 ✔️
// 2. 아이디,닉네임 비밀번호, 비밀번호 확인에서 하나라도 빠질시 인풋창 밑에 경고문 출력해주기 ✔️
// 3. 비밀번호와 비밀번호 확인 동일한지 check ✔️
// 4. 반응형 check
// 5. 아이디 중복확인후 로컬스토리지에 저장 후 마이페이지, 메인페이지에서 불러오기
// 6. 비밀번호 저장

import Header from "../components/Header";
import styles from "./style.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function Signup() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const [idError, setIdError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [idChecked, setIdChecked] = useState(false);

  const serverURL = process.env.NEXT_PUBLIC_API_SERVER_URL;

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    setIdChecked(false);
    setIdError("");
  };

  const handleId = () => {
    if (id.trim() === "") {
      setIdError("아이디를 입력해주세요.");
    } else if (!idChecked) {
      setIdError("아이디 중복확인을 해주세요.");
    } else {
      setIdError("");
    }
  };

  const handleDuplicateCheck = async () => {
    handleId();
    if (id.trim() === "") return;
    try {
      const response = await axios.post(
        `${serverURL}/member/check`,
        { username: id },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data as any;
      if (data.message.success === 1) {
        setIdError("사용 가능한 아이디입니다.");
        setIdChecked(true);
      } else {
        setIdError("이미 사용 중인 아이디입니다.");
        setIdChecked(false);
      }
    } catch (err: any) {
      setIdError(
        err.response?.data?.message ||
          "중복확인을 할 수 없습니다. 네트워크를 확인해주세요."
      );
      setIdChecked(false);
    }
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
      setConfirmPasswordError("비밀번호를 다시 입력해주세요.");
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
              onChange={handleIdChange}
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
          onClick={async () => {
            if (!idChecked) {
              alert("아이디 중복확인을 해주세요.");
              return;
            }
            try {
              await axios.post(
                `${serverURL}/member/register`,
                {
                  username: id,
                  name: nickname,
                  password: password,
                  verifyPassword: confirmPassword,
                  success: idChecked ? 1 : 0,
                },
                { headers: { "Content-Type": "application/json" } }
              );
              alert("회원가입이 완료되었습니다!");
              router.push("./LoginPage");
            } catch (err: any) {
              const msg =
                err.response?.data?.message ||
                "회원가입에 실패했습니다. 다시 시도해주세요.";
              alert(msg);
            }
          }}
          disabled={
            !idChecked ||
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

