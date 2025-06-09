"use client";

import { useRouter } from "next/navigation";
import styles from "./Header_style.module.css";

export default function Header({
  title,
  showBack = false,
  onBack,
  showExitButton = false,
  onExit,
  showDeleteButton = false,
  onDelete,
}: {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showExitButton?: boolean;
  onExit?: () => void;
  showDeleteButton?: boolean;
  onDelete?: () => void;
}) {
  const router = useRouter();
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      router.push("/");
    }
  };

  return (
    <header className={styles.header}>
      {showBack && (
        <div onClick={handleBack} className={styles.left}>
          &lt;
        </div>
      )}
      <div className={styles.center}>{title}</div>
      {showExitButton && (
        <button className={styles.exitBtn} onClick={handleExit}>
          대화종료
        </button>
      )}
      {showDeleteButton && (
        <button className={styles.deleteBtn} onClick={onDelete}>
          일기삭제
        </button>
      )}
    </header>
  );
}
