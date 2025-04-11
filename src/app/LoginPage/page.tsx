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

    try {
      const response = await axios.post(
        "https://api.budtree.store/member/login",
        {
          username: id,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json", // ✅ 꼭 명시
          },
          withCredentials: true, // ✅ 쿠키 받을 때 필요
        }
      );

      console.log("로그인 응답:", response);

      // ✅ 헤더에서 Access Token 추출
      const authHeader = response.headers["authorization"];
      const token = authHeader?.split(" ")[1];

      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      console.log("Access Token:", token);

      const data = response.data as { name?: string; user?: { name?: string } };
      const nameFromResponse = data.name || data.user?.name;
      console.log("name response : ", nameFromResponse);

      if (nameFromResponse) {
        router.push(`/mainPage?name=${encodeURIComponent(nameFromResponse)}`);
      } else {
        alert("회원정보가 없으니 회원가입을 해주세요.");
      }
    } catch (error: any) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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
