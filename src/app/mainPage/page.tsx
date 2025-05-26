"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const nameFromStorage = localStorage.getItem("userName");

    if (name) {
      setUserName(name);
      localStorage.setItem("userName", name);
    } else if (nameFromStorage) {
      setUserName(nameFromStorage);
    }
  }, [name]);

  const selfCheckBtn = () => {
    router.push("./selfcheck");
  };

  const BuddyBtn = () => {
    router.push("./chatbot");
  };

  return (
    // Main container for overall centering and responsiveness
    <div className="w-full h-screen overflow-y-auto flex flex-col items-center">
      {/* Restrict width of the main content area on larger screens */}
      <div className="w-full max-w-screen-md">
        {" "}
        {/* Adjust max-w-screen-md as needed */}
        {/* header*/}
        <div className={styles.header}>
          <Image
            className={styles.image}
            src="/title.png"
            alt="title"
            width={100}
            height={58}
          />
          <div className={styles.headerContent}>
            <span className={styles.name}>
              {userName ? `${userName}님, 반가워요` : "반가워요"}
            </span>
            <span className={styles.daily}>오늘 어떤 하루를 보내셨나요?</span>
          </div>
        </div>
        <div className={styles.selfCheckDiv}>
          <div className={styles.firstSelfCheck}>
            <div className={styles.btn}>
              <Image
                className={styles.SelfImage}
                onClick={selfCheckBtn}
                src="/selfCheckButton.png"
                alt="selfcheck"
                width={150}
                height={150}
              />
              <button className={styles.btn2} onClick={selfCheckBtn}>
                <span className={styles.font}>← 자가진단</span>
              </button>
            </div>
            <div className={styles.firstExplanation}>
              <span>우울증 기반 자가진단을</span>
              <span>원하시거나, 검사 결과를</span>
              <span>바탕으로 이야기하고 싶다면</span>
              <span>자가진단 버튼을 눌러주세요</span>
            </div>
          </div>

          <div className={styles.secondSelfCheck}>
            <div className={styles.btn}>
              <Image
                className={styles.SelfImage}
                onClick={BuddyBtn}
                src="/message.png"
                alt="selfcheck"
                width={100}
                height={100}
              />
              <button className={styles.btn2} onClick={BuddyBtn}>
                <span className={styles.font}>with BUDDY →</span>
              </button>
            </div>
            <div className={styles.secondExplanation}>
              <span>버디에게 편하게</span>
              <span>이야기를 들려주세요.</span>
              <span>버디가 함께 고민을</span>
              <span>나누고 해결해드릴께요.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image at the bottom (selfcheck.png) - styled with Tailwind CSS */}
      <div className="flex-1 flex items-end justify-center w-full">
        <Image
          src="/selfcheck.png"
          alt="selfcheck"
          width={200} // Next.js Image component requires width/height
          height={200} // These are for optimization; actual size controlled by Tailwind
          // Tailwind CSS classes for responsiveness
          className="w-full max-w-[280px] h-auto object-contain sm:max-w-[320px] md:max-w-[400px]"
          priority
        />
      </div>
    </div>
  );
}
