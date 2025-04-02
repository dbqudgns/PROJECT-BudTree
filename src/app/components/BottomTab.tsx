"use client";

import styles from "./BottomTab.module.css";
import Link from "next/link";

export default function BottomTab() {
  return (
    <nav className={styles.bottomTab}>
      <Link href="/">
        <span className={`material-icons ${styles.icon}`}>home</span>
      </Link>
      <Link href="/tree">
        <span className={`material-icons ${styles.icon}`}>park</span>
      </Link>
      <Link href="/chatbot">
        <span className={`material-icons ${styles.icon}`}>chat</span>
      </Link>
      <Link href="/mypage">
        <span className={`material-icons ${styles.icon}`}>account_circle</span>
      </Link>
    </nav>
  );
}
