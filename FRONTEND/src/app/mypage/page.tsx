"use client";

import styles from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import DeleteModal from "../components/DeleteModal";
import LogoutModal from "../components/LogoutModal";
import apiRequest from "../util/reissue";

export default function MyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false); // 회원탈퇴 모달
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 로그아웃 모달
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const savedNickname = localStorage.getItem("userName");
    const savedUserId = localStorage.getItem("id");

    // 닉네임 저장
    if (savedNickname) {
      setName(savedNickname);
    } else {
      console.log("닉네임이 localStorage에 없습니다.");
    }

    // 아이디 저장
    if (savedUserId) {
      setUserId(savedUserId);
    } else {
      console.log("유저 ID가 localStorage에 없습니다.");
    }
  }, []);

  const handleDeleteProfile = async () => {
    try {
      const response = await apiRequest.delete("member/edit", {});
      const data = response.data as {};
      localStorage.clear();
      alert("그동안 이용해주셔서 감사합니다.");
      router.push("/");
    } catch (err) {
      localStorage.clear();
      alert(err.response?.data?.message || "회원 탈퇴에 실패했습니다.");
      router.push("/LoginPage");
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    // 1️⃣ 토큰 없으면 서버에 요청하지 않고 바로 로컬 로그아웃 처리
    if (!token) {
      alert("이미 로그아웃된 상태입니다.");
      localStorage.clear();
      router.push("/LoginPage");
      return;
    }

    try {
      const response = await apiRequest.get("member/logout", {});

      if (response.status === 200) {
        localStorage.clear();
        alert("로그아웃 되었습니다!");
        router.push("/");
      } else {
        throw new Error("로그아웃 요청이 실패했습니다");
      }
    } catch (error) {
      localStorage.clear();
      router.push("/LoginPage");
    }
  };

  return (
    <div className="pageWrapper">
      <div className={styles.container}>
        <Header title="마이 페이지" showBack />;
        <div className="all_content">
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
                <h4 className={styles.nickname}>{name}</h4>
                <p className={styles.userId}>{userId}</p>
              </div>
            </div>
          </div>
          <br></br>
          {/* 활동 내역 섹션 */}
          <div className={styles.menuCard}>
            <Link href="/diary-history" className={styles.menuItem}>
              <span>일기 내역</span>
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
            <Link href="/chat-history" className={styles.menuItem}>
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
        </div>
        {/* 회원 탈퇴 및 로그아웃 */}
        <div className={styles.footer}>
          <button
            className={styles.textButton}
            onClick={() => setShowLogoutModal(true)}
          >
            로그아웃
          </button>
          {showLogoutModal && (
            <LogoutModal
              onClose={() => setShowLogoutModal(false)}
              onConfirm={handleLogout}
            />
          )}
          <span className={styles.separator}>|</span>
          <button
            className={styles.textButton}
            onClick={() => setShowModal(true)}
          >
            회원탈퇴
          </button>
        </div>
        {/* 모달 렌더링 */}
        {showModal && (
          <DeleteModal
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteProfile}
          />
        )}
      </div>
    </div>
  );
}
