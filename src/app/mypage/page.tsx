"use client";

import styles from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation"; // ✅ 올바른 import

export default function MyPage() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://api.budtree.store/member/logout",
        {},
        {
          withCredentials: true, // 쿠키(리프레시 토큰) 포함
        }
      );
    } catch (e) {
      console.error("백엔드 로그아웃 실패:", e);
    } finally {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      alert("로그아웃 되었습니다.");
      router.push("/LoginPage");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        <h1 className={styles.title}>MY 페이지</h1>
      </div>
      <br></br>

      <div className={styles.content}>
        {/* 프로필 섹션 */}
        <div className={styles.profileCard}>
          <div className={styles.profileInfo}>
            <Image
              src="/buddy.png"
              alt="프로필 이미지"
              width={60}
              height={60}
              className={styles.profileImage}
            />
          </div>
          <div className={styles.userInfo}>
            <h2 className={styles.nickname}>닉네임</h2>
            <p className={styles.userId}>아이디</p>
          </div>
        </div>
      </div>

      <br></br>

      {/* 활동 내역 섹션 */}
      <div className={styles.menuCard}>
        <Link href="/diary-history" className={styles.menuItem}>
          <span>일기장 내역</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
        <div className={styles.divider}></div>
        <Link href="/chat" className={styles.menuItem}>
          <span>대화 내역</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
        <div className={styles.divider}></div>
        <Link href="/selfcheck-history" className={styles.menuItem}>
          <span>자가진단 내역</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </div>

      <br></br>

      {/* 계정 설정 섹션 */}
      <div className={styles.menuCard}>
        <Link href="/nickname-change" className={styles.menuItem}>
          <span>닉네임 변경</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
        <div className={styles.divider}></div>
        <Link href="/password-change" className={styles.menuItem}>
          <span>비밀번호 변경</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </div>

      {/* 회원 탈퇴 및 로그아웃 */}
      <div className={styles.footer}>
        <button className={styles.textButton} onClick={handleLogout}>
          로그아웃
        </button>
        <span className={styles.separator}>|</span>
        <button className={styles.textButton}>회원탈퇴</button>
      </div>
    </div>
  );
}
