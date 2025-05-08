"use client";

import Header from "../components/Header";
import styles from "./style.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import apiRequest from "../util/reissue";

// 1. 아이디를 입력하면 중복확인 ✔️
// 2. 아이디,닉네임 비밀번호, 비밀번호 확인에서 하나라도 빠질시 인풋창 밑에 경고문 출력해주기 ✔️
// 3. 비밀번호와 비밀번호 확인 동일한지 check ✔️
// 4. 반응형 check ✔️
// 5. 아이디 중복확인후 로컬스토리지에 저장 후 마이페이지, 메인페이지에서 불러오기 ✔️
// 6. 비밀번호 저장

export default function Signup() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [lastCheckedId, setLastCheckedId] = useState("");

  const router = useRouter();
  const serverURL = process.env.NEXT_PUBLIC_API_SERVER_URL;

  // 에러 문구 출력 useState()
  const [idError, setIdError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [idChecked, setIdChecked] = useState(false);

  const handleDuplicateCheck = async () => {
    handleId(); // 강제로 blur 처리

    // 아이디가 비어있는지 확인
    if (id.trim() === "") {
      setIdError("아이디를 입력해주세요.");
      return;
    }

    // 중복확인
    try {
      const response = await apiRequest.post(
        "member/check",
        { username: id },
        {
          headers: {
            Authorization: null, // ✅ 토큰 헤더 제거
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data as any;

      // 서버 응답 구조 확인
      if (data && data.message && data.message.success === 1) {
        setIdError("사용 가능한 아이디입니다.");
        //localStorage.setItem("id", id);
        setIdChecked(true);
        setLastCheckedId(id); // ✅ 중복확인된 id 기억
      } else {
        setIdError("이미 사용 중인 아이디입니다.");
        setIdChecked(false);
      }
    } catch (err) {
      if (err.response) {
        console.log("에러 상세:", err.response.data);
        setIdError(err.response.data.message || "중복확인을 할 수 없습니다.");
      } else {
        alert("네트워크 오류 또는 서버 응답 없음.");
      }
      setIdChecked(false);
    }
  };

  //console.log("최종 요청 주소:", `${serverURL}/member/register`);

  const buttonClick = async () => {
    //localStorage.setItem("userName", nickname);

    if (id !== lastCheckedId) {
      alert("아이디를 수정하셨습니다. 다시 중복확인을 해주세요.");
      return;
    }

    try {
      const response = await apiRequest.post("member/register", {
        username: id,
        name: nickname,
        password: password,
        verifyPassword: confirmPassword,
        success: idChecked ? 1 : 0, // ✅ 추가: 아이디 중복확인 여부

        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("회원가입이 완료되었습니다!");
      router.push("./LoginPage");
    } catch (err) {
      if (err.response) {
        console.error("회원가입 에러:", err.response.data);
        const errorMessage =
          err.response.data?.message || "회원가입에 실패했습니다.";
        alert(errorMessage);
      } else if (err.request) {
        console.log("요청 정보:", err.request);
        alert("서버 응답이 없습니다. 네트워크 연결을 확인해주세요.");
      } else {
        console.error("기타 에러:", err.message);
        alert("요청 중 오류가 발생했습니다: " + err.message);
      }
    }
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
              onChange={(e) => {
                setId(e.target.value);
                setIdChecked(false);
              }}
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
