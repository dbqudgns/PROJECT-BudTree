import styles from "./Header_style.module.css";

export default function Header({ title }: { title: string }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>&lt;</div>
      <div className={styles.center}>{title}</div>
    </header>
  );
}
