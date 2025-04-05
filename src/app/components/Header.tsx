"use client";

import { useRouter } from "next/navigation";
import styles from "./Header_style.module.css";

export default function Header({
  title,
  showBack = false,
  onBack,
}: {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}) {
  const router = useRouter();
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
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
    </header>
  );
}
