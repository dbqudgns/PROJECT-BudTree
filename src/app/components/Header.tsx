"use client";

import { useRouter } from "next/navigation";
import styles from "./Header_style.module.css";

export default function Header({
  title,
  showBack = false,
}: {
  title: string;
  showBack?: boolean;
}) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <header className={styles.header}>
      <div onClick={handleBack} className={styles.left}>
        &lt;
      </div>
      {/* {showBack && <div className={styles.left}>&lt;</div>} */}
      <div className={styles.center}>{title}</div>
    </header>
  );
}
