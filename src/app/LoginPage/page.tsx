"use client";
import styles from "./style.module.css";
import { useState } from "react";
import Image from "next/image"; // Image 컴포넌트 import
import Header from "../components/Header";
import axios from "axios";
import { useRouter } from "next/navigation"; // ✅ 올바른 import

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (id.trim() === "" || password.trim() === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setError("");
    setLoading(true);

    console.log(id);
    console.log(password);
    try {
      const response = await axios.post(
        "https://api.budtree.store/member/login",
        {
          username: id,
          password: password,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response); // 응답이 정상적으로 오는지 확인

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // JWT 저장
        alert("로그인 성공!");
        router.push(`/main?name=${encodeURIComponent(name)}`);
      } else {
        alert("로그인 실패: " + response.data.message);
      }
    } catch (error: any) {
      console.error("로그인 중 오류 발생:", error);

      setError(
        error.response?.data?.message || "로그인 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <Header title="로그인" showBack={true} />
      {/* favicon을 src로 사용 */}
      <div className={styles.InputArea}>
        <div className={styles.StartImage}>
          <Image
            className={styles.LogoImage}
            src="/favicon.png"
            alt="logo"
            width={247}
            height={202}
          />
        </div>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          className={styles.inputId}
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <br />

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
        <button className={styles.btn} onClick={handleLogin} disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
          {/* {loading ? "로그인 중..." : "완료"} */}
        </button>
      </div>
    </div>
  );
}
