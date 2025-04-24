// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./selfcheck_style.module.css";
// import Header from "../components/Header";

// const questions = [
//   "일 또는 여가 활동을 하는데 흥미나 즐거움을 느끼지 못함",
//   "기분이 가라앉거나, 우울하거나, 희망이 없음",
//   "잠이 들거나 계속 잠을 자는 것이 어려움. 또는 잠을 너무 많이 잠",
//   "피곤하다고 느끼거나 기운이 거의 없음",
//   "입맛이 없거나 과식을 함",
//   "자신을 부정적으로 봄 – 혹은 자신이 실패자라고 느끼거나 자신 또는 가족을 실망시킴",
//   "신문을 읽거나 텔레비전 보는 것과 같은 일에 집중하는 것이 어려움",
//   "다른 사람들이 주목할 정도로 너무 느리게 움직이거나 말을 함 또는 반대로 평상시보다 많이 움직여서, 너무 안절부절 못하거나 들떠 있음",
//   "자신이 죽는 것이 더 낫다고 생각하거나 어떤 식으로든 자신을 해칠 것이라고 생각함",
// ];

// const options = [
//   "전혀 방해받지 않았다",
//   "며칠동안 방해받았다",
//   "7일 이상 방해받았다",
//   "거의 매일 방해받았다",
// ];

// export default function Page() {
//   const [answers, setAnswers] = useState<number[]>(Array(9).fill(-1));
//   const [current, setCurrent] = useState(0);
//   const router = useRouter();

//   const handleSelect = (value: number) => {
//     const updated = [...answers];
//     updated[current] = value;
//     setAnswers(updated);
//   };

//   const handlePrev = () => {
//     if (current > 0) {
//       setCurrent((prev) => prev - 1);
//     }
//   };

//   const totalScore = answers.reduce(
//     (acc, val) => acc + (val >= 0 ? val : 0),
//     0
//   );

//   return (
//     <main className={styles.container}>
//       <Header title="자가진단" showBack />

//       <>
//         <section className={styles.progressSection}>
//           <span className={styles.progressText}>{current + 1}/9</span>
//           <div className={styles.progressBarWrapper}>
//             <div
//               className={styles.progressBarFill}
//               style={{
//                 width: `${((current + 1) / questions.length) * 100}%`,
//               }}
//             />
//           </div>
//           <span className={styles.progressText}>
//             {Math.round(((current + 1) / questions.length) * 100)}%
//           </span>
//         </section>
//         <section className={styles.questionBox}>
//           <p className={styles.questionText}>
//             Q. 지난 2주일 동안 {questions[current]} 얼마나 있었나요?
//           </p>
//         </section>

//         <section className={styles.optionsBox}>
//           <ul className={styles.options}>
//             {options.map((opt, idx) => (
//               <li key={idx}>
//                 <label>
//                   <input
//                     type="radio"
//                     name={`q${current}`}
//                     value={idx}
//                     checked={answers[current] === idx}
//                     onChange={() => handleSelect(idx)}
//                   />
//                   {opt}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </section>

//         <section className={styles.buttonSection}>
//           <button
//             className={styles.prevButton}
//             onClick={handlePrev}
//             disabled={current === 0}
//           >
//             ← 이전
//           </button>
//           {current === questions.length - 1 ? (
//             <button
//               className={styles.submitButton}
//               onClick={() => {
//                 const results = questions.map((question, index) => ({
//                   question,
//                   score: answers[index],
//                 }));
//                 const totalScore = results.reduce((sum, r) => sum + r.score, 0);

//                 sessionStorage.setItem(
//                   "selfcheckResults",
//                   JSON.stringify(results)
//                 );
//                 sessionStorage.setItem(
//                   "selfcheckTotalScore",
//                   totalScore.toString()
//                 );

//                 router.push(`/selfcheck/result?score=${totalScore}`);
//               }}
//               disabled={answers[current] === -1}
//             >
//               제출
//             </button>
//           ) : (
//             <button
//               className={styles.nextButton}
//               onClick={() => {
//                 setCurrent((prev) => prev + 1);
//               }}
//               disabled={answers[current] === -1}
//             >
//               다음 →
//             </button>
//           )}
//         </section>
//       </>
//     </main>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./selfcheck_style.module.css";
import Header from "../components/Header";
import apiClient from "../util/reissue"; 

const questions = [
  "일 또는 여가 활동을 하는데 흥미나 즐거움을 느끼지 못함",
  "기분이 가라앉거나, 우울하거나, 희망이 없음",
  "잠이 들거나 계속 잠을 자는 것이 어려움. 또는 잠을 너무 많이 잠",
  "피곤하다고 느끼거나 기운이 거의 없음",
  "입맛이 없거나 과식을 함",
  "자신을 부정적으로 봄 – 혹은 자신이 실패자라고 느끼거나 자신 또는 가족을 실망시킴",
  "신문을 읽거나 텔레비전 보는 것과 같은 일에 집중하는 것이 어려움",
  "다른 사람들이 주목할 정도로 너무 느리게 움직이거나 말을 함 또는 반대로 평상시보다 많이 움직여서, 너무 안절부절 못하거나 들떠 있음",
  "자신이 죽는 것이 더 낫다고 생각하거나 어떤 식으로든 자신을 해칠 것이라고 생각함",
];

const options = [
  "전혀 방해받지 않았다",
  "며칠동안 방해받았다",
  "7일 이상 방해받았다",
  "거의 매일 방해받았다",
];

// 서버에 제출할 API 엔드포인트 (실제 엔드포인트로 변경하세요)
const SUBMIT_ENDPOINT = "/survey/save"; // 예시 엔드포인트

export default function Page() {
  const [answers, setAnswers] = useState<number[]>(Array(9).fill(-1));
  const [current, setCurrent] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태 추가
  const [submitError, setSubmitError] = useState<string | null>(null); // 에러 상태 추가
  const router = useRouter();

  const handleSelect = (value: number) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  // 2. 제출 핸들러 수정 (async 함수로 변경)
  const handleSubmit = async () => {
    // 마지막 질문에 답했는지 확인 (버튼 비활성화 로직으로 이미 체크될 수 있음)
    if (answers[current] === -1) {
      setSubmitError("마지막 질문에 답변해주세요.");
      return;
    }

    setIsSubmitting(true); // 로딩 시작
    setSubmitError(null); // 이전 에러 초기화

    // 3. Request Body 생성
    const requestBody: { [key: string]: number } = {};
    answers.forEach((score, index) => {
      // 각 항목의 키를 "part1", "part2", ... 로 설정
      requestBody[`part${index + 1}`] = score;
    });

    try {
      // 4. API 호출 (POST 요청)
      console.log("Submitting selfcheck data:", requestBody); // 요청 데이터 확인용 로그
      const response = await apiClient.post(SUBMIT_ENDPOINT, requestBody);

      console.log("API Response:", response); // 응답 데이터 확인용 로그

      const data = response.data as {
        status: number;
        message: { surveyId: number};
      };

      // 5. 응답 처리 및 surveyId 저장
      if (data.message.surveyId) {
        const surveyId = data.message.surveyId;
        localStorage.setItem('surveyId', surveyId.toString()); // surveyId를 localStorage에 저장
        console.log("Survey ID saved to localStorage:", surveyId);

        // 기존 로직: sessionStorage에 결과 저장 및 페이지 이동
        const results = questions.map((question, index) => ({
          question,
          score: answers[index],
        }));
        const totalScore = results.reduce((sum, r) => (r.score >= 0 ? sum + r.score : sum), 0); // Ensure score is non-negative

        sessionStorage.setItem(
          "selfcheckResults",
          JSON.stringify(results)
        );
        sessionStorage.setItem(
          "selfcheckTotalScore",
          totalScore.toString()
        );

        router.push(`/selfcheck/result?score=${totalScore}`);
      } else {
        // 응답 구조가 예상과 다를 경우 에러 처리
        console.error("Unexpected response structure:", response.data);
        setSubmitError("서버로부터 예상치 못한 응답을 받았습니다.");
      }

    } catch (error) {
      // 6. 에러 처리
      console.error("자가진단 제출 중 오류 발생:", error);
    } finally {
      setIsSubmitting(false); // 로딩 종료
    }
  };

  return (
    <main className={styles.container}>
      <Header title="자가진단" showBack />

       {/* 에러 메시지 표시 */}
       {submitError && <div style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>{submitError}</div>}

      <>
        <section className={styles.progressSection}>
          <span className={styles.progressText}>{current + 1}/9</span>
          <div className={styles.progressBarWrapper}>
            <div
              className={styles.progressBarFill}
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <span className={styles.progressText}>
            {Math.round(((current + 1) / questions.length) * 100)}%
          </span>
        </section>
        <section className={styles.questionBox}>
          <p className={styles.questionText}>
            Q. 지난 2주일 동안 {questions[current]} 얼마나 있었나요?
          </p>
        </section>

        <section className={styles.optionsBox}>
          <ul className={styles.options}>
            {options.map((opt, idx) => (
              <li key={idx}>
                <label>
                  <input
                    type="radio"
                    name={`q${current}`}
                    value={idx}
                    checked={answers[current] === idx}
                    onChange={() => handleSelect(idx)}
                    disabled={isSubmitting} // 제출 중에는 옵션 변경 불가
                  />
                  {opt}
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.buttonSection}>
          <button
            className={styles.prevButton}
            onClick={handlePrev}
            disabled={current === 0 || isSubmitting} // 이전 버튼도 제출 중 비활성화
          >
            ← 이전
          </button>
          {current === questions.length - 1 ? (
            <button
              className={styles.submitButton}
              onClick={handleSubmit} // 수정된 핸들러 연결
              // 마지막 질문 답변 완료 & 제출 중이 아닐 때 활성화
              disabled={answers[current] === -1 || isSubmitting}
            >
              {isSubmitting ? "제출 중..." : "제출"} {/* 로딩 상태 표시 */}
            </button>
          ) : (
            <button
              className={styles.nextButton}
              onClick={() => {
                if (answers[current] !== -1) { // 다음 버튼 클릭 시 현재 질문 답변 확인
                    setCurrent((prev) => prev + 1);
                }
              }}
              // 현재 질문 답변 완료 & 제출 중이 아닐 때 활성화
              disabled={answers[current] === -1 || isSubmitting}
            >
              다음 →
            </button>
          )}
        </section>
      </>
    </main>
  );
}
