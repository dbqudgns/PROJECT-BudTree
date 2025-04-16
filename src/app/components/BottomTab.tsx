"use client";

import styles from "./BottomTab.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomTab() {
  const pathname = usePathname();

  return (
    <nav className={styles.bottomTab}>
      <Link href="/mainPage">
        <span
          className={`material-icons ${
            pathname === "/mainPage" ? styles.iconActive : styles.iconInactive
          }`}
        >
          home
        </span>
      </Link>
      <Link href="/tree">
        <span
          className={`material-icons ${
            pathname === "/tree" ? styles.iconActive : styles.iconInactive
          }`}
        >
          park
        </span>
      </Link>
      <Link href="/chatbot">
        <span
          className={`material-icons ${
            pathname === "/chatbot" ? styles.iconActive : styles.iconInactive
          }`}
        >
          chat
        </span>
      </Link>
      <Link href="/mypage">
        <span
          className={`material-icons ${
            pathname === "/mypage" ? styles.iconActive : styles.iconInactive
          }`}
        >
          account_circle
        </span>
      </Link>
    </nav>
  );
}
