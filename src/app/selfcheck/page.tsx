import styles from "./selfcheck_style.module.css";
import Header from "../components/Header";

export default function Page() {
  return (
    <main>
      <Header title={"자가진단"} />

      <section className={styles.progressSection}>
        <span className={styles.progressText}>1/9</span>
        <div className={styles.progressBarWrapper}>
          <div className={styles.progressBarFill}></div>
        </div>
        <span className={styles.progressText}>11%</span>
      </section>

      <section className={styles.questionBox}>
        <p className={styles.questionText}>
          Q. 지난 2주일 동안 일 또는 여가 활동을 하는데 흥미나 즐거움을 느끼지
          못한 경험이 얼마나 있었나요?
        </p>
        <ul className={styles.options}>
          <li>
            <label>
              <input type="radio" name="q1" /> 전혀 방해받지 않음
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="q1" defaultChecked /> 중증 방해 받음
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="q1" /> 7일 이상 방해 받음
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="q1" /> 거의 매일 방해 받음
            </label>
          </li>
        </ul>
      </section>

      <section className={styles.buttonSection}>
        <button className={styles.prevButton}>← 이전</button>
        <button className={styles.nextButton}>다음 →</button>
      </section>
    </main>
  );
}
