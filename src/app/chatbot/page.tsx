// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Header from "../components/Header";
// import styles from "./chatbot_style.module.css";

// export default function ChatPage() {
//   const router = useRouter();
//   const handleBackToHome = () => router.push("/mainPage");

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const bottomRef = useRef<HTMLDivElement | null>(null);
//   const questionRef = useRef<HTMLDivElement | null>(null);
//   const [results, setResults] = useState<{ question: string; score: number }[]>(
//     []
//   );
//   const [showAllQuestions, setShowAllQuestions] = useState(false);
//   const [nickname, setNickname] = useState("<닉네임>");
//   const [isLoading, setIsLoading] = useState(false);
//   const [surveyId, setSurveyId] = useState<string | null>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const searchParams = new URLSearchParams(window.location.search);
//       const nicknameParam = searchParams.get("nickname");
//       if (nicknameParam) setNickname(nicknameParam);

//       const id = searchParams.get("surveyId");
//       setSurveyId(id);
//       if (id) {
//         const dummyResults = [
//           {
//             question: "일 또는 여가 활동을 하는데 흥미나 즐거움을 느끼지 못함",
//             score: 0,
//           },
//           { question: "기분이 가라앉거나, 우울하거나, 희망이 없음", score: 1 },
//           {
//             question:
//               "잠이 들거나 계속 잠을 자는 것이 어려움 또는 잠을 너무 많이 잠",
//             score: 2,
//           },
//           { question: "피곤하다고 느끼거나 기운이 거의 없음", score: 0 },
//           { question: "입맛이 없거나 과식을 함", score: 3 },
//           {
//             question:
//               "자신을 부정적으로 봄 혹은 자신이 실패자라고 느끼거나 자신 또는 가족을 실망시킴",
//             score: 1,
//           },
//           {
//             question:
//               "신문을 읽거나 텔레비전 보는 것과 같은 일에 집중하는 것이 어려움",
//             score: 0,
//           },
//           {
//             question:
//               "움직임이나 말이 평소보다 눈에 띄게 느려지거나 과하게 빨라짐",
//             score: 2,
//           },
//           {
//             question:
//               "자신이 죽는 것이 더 낫다고 생각하거나 어떤 식으로든 자신을 해칠 것이라고 생각함",
//             score: 3,
//           },
//         ];
//         setResults(dummyResults);
//       }
//     }
//   }, []);

//   const simulateAssistantReply = async (question: string, score: number) => {
//     return new Promise<{ content: string }>((resolve) => {
//       setTimeout(() => {
//         resolve({
//           content: `안녕! ${question}에서 ${scoreLabels[score]}를 선택했어 요즘 일은 어떻고 좋아하는 취미가 있어?`,
//         });
//       }, 1000);
//     });
//   };

//   const [selectedScore, setSelectedScore] = useState<number | null>(null);
//   const [selectedSelection, setSelectedSelection] = useState<{
//     question: string;
//     score: number;
//   } | null>(null);
//   const scoreLabels = [
//     "전혀 방해 받지 않았다",
//     "며칠 동안 방해 받았다",
//     "7일 이상 방해 받았다",
//     "거의 매일 방해 받았다",
//   ];

//   const handleSend = async () => {
//     if (isLoading || !input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const assistantReply = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: [...messages, userMessage] }),
//       }).then(async (res) => {
//         if (!res.ok) throw new Error("응답 오류");
//         const data = await res.text();
//         try {
//           return JSON.parse(data);
//         } catch {
//           return { content: "아직 서버가 준비되지 않았어요." };
//         }
//       });

//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: assistantReply.content },
//       ]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "현재 서버와 연결할 수 없어. 나중에 다시 시도해줘!",
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // useEffect(() => {
//   //   const searchParams = new URLSearchParams(window.location.search);
//   //   const surveyId = searchParams.get("surveyId");

//   //   if (surveyId) {
//   //     const dummyResults = [
//   //       { question: "일 또는 여가 활동에 흥미를 느끼지 못함", score: 0 },
//   //       { question: "기분이 가라앉고 희망이 없음", score: 1 },
//   //       { question: "잠을 너무 많이 잠", score: 2 },
//   //       { question: "피곤하고 기운이 없음", score: 0 },
//   //       { question: "입맛이 없거나 과식을 함", score: 3 },
//   //       { question: "자신을 실패자라 느낌", score: 1 },
//   //       { question: "집중 어려움", score: 0 },
//   //       { question: "너무 느리거나 너무 들떠 있음", score: 2 },
//   //       { question: "자살 생각", score: 3 },
//   //     ];
//   //     setResults(dummyResults);
//   //   }
//   // }, []);

//   useEffect(() => {
//     if (selectedSelection) {
//       const sendInitialPrompt = async () => {
//         const { question, score } = selectedSelection;
//         const assistantReply = await simulateAssistantReply(question, score);
//         setMessages((prev) => [
//           ...prev,
//           { role: "assistant", content: assistantReply.content },
//         ]);
//         setSelectedSelection(null);
//       };

//       sendInitialPrompt();
//     }
//   }, [selectedSelection]);

//   const getNicknameSuffix = (name: string): string => {
//     if (!name) return "";
//     const lastChar = name[name.length - 1];
//     const code = lastChar.charCodeAt(0) - 0xac00;

//     if (code < 0 || code > 0xd7a3 - 0xac00) {
//       return "아!";
//     }
//     const jong = code % 28;
//     return jong === 0 ? "야!" : "아!";
//   };

//   return (
//     <main className={styles.container}>
//       <Header
//         title="BUDDY"
//         showBack
//         showExitButton
//         onBack={handleBackToHome}
//         onExit={() => router.push("/chatbot/endModal")}
//       />

//       <div className={styles.dateDivider}>
//         {new Date().toLocaleDateString("ko-KR", {
//           month: "long",
//           day: "numeric",
//           weekday: "long",
//         })}
//       </div>

//       <div className={styles.botMessageBox}>
//         <div className={styles.Profile}>
//           <img src="/chat.png" alt="buddy" />
//         </div>
//         <div className={styles.botMessageText}>
//           <p className={styles.botMessageName}>버디</p>
//           <p className={styles.botMessage}>
//             안녕, {nickname}
//             {getNicknameSuffix(nickname)} <br />
//             {surveyId
//               ? "아래는 자가진단 검사 항목별 점수를 정리한 거야. 나와 이야기 하고 싶은 항목을 선택하면내가 상담해주고 함께 해결해줄게! 또, 항목들의 내용을 알고 싶다면 채팅창 옆에 있는 + 버튼을 눌러봐!"
//               : "편안하게 대화를 시작해봐!요즘 고민이 있거나 힘든게 있으면 너의 이야기를 들려줄래?"}
//           </p>
//         </div>
//       </div>

//       {surveyId && (
//         <div className={styles.scoreButtons}>
//           {[0, 1, 2, 3].map((score) => {
//             const matchedIndexes = results
//               .map((r, i) => (r.score === score ? `Q${i + 1}` : null))
//               .filter(Boolean)
//               .join(", ");
//             return (
//               <button
//                 key={score}
//                 className={styles.scoreButton}
//                 onClick={() => setSelectedScore(score)}
//               >
//                 <strong>{scoreLabels[score]}</strong>
//                 {matchedIndexes && (
//                   <>
//                     <br />
//                     {matchedIndexes}
//                   </>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       )}

//       {surveyId && selectedScore !== null && (
//         <div
//           className={styles.overlay}
//           onClick={(e) => {
//             if (
//               questionRef.current &&
//               !questionRef.current.contains(e.target as Node)
//             ) {
//               setSelectedScore(null);
//             }
//           }}
//         >
//           <div ref={questionRef} className={styles.questionList}>
//             {results
//               .filter((q) => q.score === selectedScore)
//               .map((q) => {
//                 const index = results.findIndex(
//                   (r) => r.question === q.question
//                 );
//                 return (
//                   <p
//                     key={q.question}
//                     className={styles.questionItem}
//                     onClick={() => {
//                       setSelectedSelection({
//                         question: q.question,
//                         score: q.score,
//                       });
//                       setMessages((prev) => [
//                         ...prev,
//                         {
//                           role: "user",
//                           content: `${q.question}에서 ${
//                             scoreLabels[q.score]
//                           }를 선택했어.`,
//                         },
//                       ]);
//                       setSelectedScore(null);
//                     }}
//                   >
//                     Q{index + 1}. {q.question}
//                   </p>
//                 );
//               })}
//           </div>
//         </div>
//       )}

//       {surveyId && showAllQuestions && (
//         <div
//           className={styles.overlay}
//           onClick={() => setShowAllQuestions(false)}
//         >
//           <div
//             className={styles.questionList}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {results.map((q, i) => (
//               <p
//                 key={i}
//                 className={styles.questionItem}
//                 onClick={() => {
//                   setSelectedSelection({
//                     question: q.question,
//                     score: q.score,
//                   });
//                   setMessages((prev) => [
//                     ...prev,
//                     {
//                       role: "user",
//                       content: `${q.question}에서 ${
//                         scoreLabels[q.score]
//                       }를 선택했어.`,
//                     },
//                   ]);
//                   setShowAllQuestions(false);
//                 }}
//               >
//                 Q{i + 1}. {q.question}
//               </p>
//             ))}
//           </div>
//         </div>
//       )}

//       <section className={styles.chatWindow}>
//         {messages.map((msg, i) =>
//           msg.role === "user" ? (
//             <div key={i} className={styles.userMessage}>
//               {msg.content}
//             </div>
//           ) : (
//             <div key={i} className={styles.botMessageBox}>
//               <div className={styles.Profile}>
//                 <img src="/chat.png" alt="buddy" />
//               </div>
//               <div className={styles.botMessageText}>
//                 <p className={styles.botMessageName}>버디</p>
//                 <p className={styles.botMessage}>{msg.content}</p>
//               </div>
//             </div>
//           )
//         )}
//         {isLoading && (
//           <div className={styles.botMessageBox}>
//             <div className={styles.Profile}>
//               <img src="/chat.png" alt="buddy" />
//             </div>
//             <div className={styles.botMessageText}>
//               <p className={styles.botMessageName}>버디</p>
//               <p className={styles.botLoading}>...</p>
//             </div>
//           </div>
//         )}
//         <div ref={bottomRef} />
//       </section>

//       <section className={styles.inputSection}>
//         {surveyId && (
//           <button
//             className={`${styles.profileBtn} ${
//               showAllQuestions ? styles.rotated : ""
//             }`}
//             onClick={() => setShowAllQuestions((prev) => !prev)}
//           >
//             <span>+</span>
//           </button>
//         )}
//         <input
//           type="text"
//           className={styles.input}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="버디에게 이야기해보세요"
//           onKeyUp={(e) => {
//             if (e.key === "Enter" && !e.repeat) {
//               e.preventDefault();
//               handleSend();
//             }
//           }}
//         />
//         <button className={styles.sendBtn} onClick={handleSend}>
//           ⬆
//         </button>
//       </section>
//     </main>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import styles from "./chatbot_style.module.css";

export default function ChatPage() {
  const router = useRouter();
  const handleBackToHome = () => router.push("/mainPage");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const questionRef = useRef<HTMLDivElement | null>(null);
  const [results, setResults] = useState<{ question: string; score: number }[]>([]);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [nickname, setNickname] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [surveyId, setSurveyId] = useState<string | null>(null);

  // localStorage에서 userName을 불러와 nickname으로 설정
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("userName");
      if (storedName) setNickname(storedName);

      const params = new URLSearchParams(window.location.search);
      const id = params.get("surveyId");
      setSurveyId(id);

      const stored = sessionStorage.getItem("selfcheckResults");
      if (stored) {
        try {
          const obj = JSON.parse(stored) as Record<string, { question: string; score: number }>;
          const arr = Object.keys(obj)
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .map((key) => obj[key]);
          setResults(arr);
        } catch (error) {
          console.error("자가진단 결과 파싱 오류:", error);
        }
      }
    }
  }, []);

  const scoreLabels = [
    "전혀 방해 받지 않았다",
    "며칠 동안 방해 받았다",
    "7일 이상 방해 받았다",
    "거의 매일 방해 받았다",
  ];

  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [selectedSelection, setSelectedSelection] = useState<{ question: string; score: number } | null>(null);

  const simulateAssistantReply = async (question: string, score: number) => {
    return new Promise<{ content: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          content: `안녕! ${question}에서 ${scoreLabels[score]}를 선택했어. 요즘 기분은 어때? 좋아하는 취미가 있어?`,
        });
      }, 1000);
    });
  };

  const handleSend = async () => {
    if (isLoading || !input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      if (!response.ok) throw new Error("응답 오류");
      const text = await response.text();
      let assistantReply;
      try {
        assistantReply = JSON.parse(text);
      } catch {
        assistantReply = { content: "아직 서버가 준비되지 않았어요." };
      }

      setMessages((prev) => [...prev, { role: "assistant", content: assistantReply.content }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "현재 서버와 연결할 수 없어. 나중에 다시 시도해줘!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 선택된 항목으로 초기 메시지 전송
  useEffect(() => {
    if (selectedSelection) {
      const sendInitialPrompt = async () => {
        const { question, score } = selectedSelection;
        const reply = await simulateAssistantReply(question, score);
        setMessages((prev) => [...prev, { role: "assistant", content: reply.content }]);
        setSelectedSelection(null);
      };
      sendInitialPrompt();
    }
  }, [selectedSelection]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getNicknameSuffix = (name: string): string => {
    if (!name) return "";
    const lastChar = name[name.length - 1];
    const code = lastChar.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 0xd7a3 - 0xac00) return "아!";
    const jong = code % 28;
    return jong === 0 ? "야!" : "아!";
  };

  return (
    <main className={styles.container}>
      <Header
        title="BUDDY"
        showBack
        showExitButton
        onBack={handleBackToHome}
        onExit={() => router.push("/chatbot/endModal")}
      />

      <div className={styles.dateDivider}>
        {new Date().toLocaleDateString("ko-KR", {
          month: "long",
          day: "numeric",
          weekday: "long",
        })}
      </div>

      <div className={styles.botMessageBox}>
        <div className={styles.Profile}>
          <img src="/chat.png" alt="buddy" />
        </div>
        <div className={styles.botMessageText}>
          <p className={styles.botMessageName}>버디</p>
          <p className={styles.botMessage}>
            안녕, {nickname}{getNicknameSuffix(nickname)} <br />
            {surveyId
              ? "아래는 자가진단 검사 항목별 점수를 정리한 거야. 나와 이야기 하고 싶은 항목을 선택하면 내가 상담해주고 함께 해결해줄게! 또, 항목들의 내용을 알고 싶다면 채팅창 옆에 있는 + 버튼을 눌러봐!"
              : "편안하게 대화를 시작해봐! 요즘 고민이 있거나 힘든 게 있으면 너의 이야기를 들려줄래?"}
          </p>
        </div>
      </div>

      {surveyId && (
        <div className={styles.scoreButtons}>
          {[0, 1, 2, 3].map((score) => {
            const matched = results
              .map((r, idx) => (r.score === score ? `Q${idx + 1}` : null))
              .filter(Boolean)
              .join(", ");
            return (
              <button
                key={score}
                className={styles.scoreButton}
                onClick={() => setSelectedScore(score)}
              >
                <strong>{scoreLabels[score]}</strong>
                {matched && <><br />{matched}</>}
              </button>
            );
          })}
        </div>
      )}

      {surveyId && selectedScore !== null && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (questionRef.current && !questionRef.current.contains(e.target as Node)) {
              setSelectedScore(null);
            }
          }}
        >
          <div ref={questionRef} className={styles.questionList}>
            {results
              .filter((q) => q.score === selectedScore)
              .map((q) => {
                const idx = results.findIndex((r) => r.question === q.question);
                return (
                  <p
                    key={q.question}
                    className={styles.questionItem}
                    onClick={() => {
                      setSelectedSelection({ question: q.question, score: q.score });
                      setMessages((prev) => [...prev, { role: "user", content: `${q.question}에서 ${scoreLabels[q.score]}를 선택했어.` }]);
                      setSelectedScore(null);
                    }}
                  >
                    Q{idx + 1}. {q.question}
                  </p>
                );
              })}
          </div>
        </div>
      )}

      {surveyId && showAllQuestions && (
        <div className={styles.overlay} onClick={() => setShowAllQuestions(false)}>
          <div className={styles.questionList} onClick={(e) => e.stopPropagation()}>
            {results.map((q, i) => (
              <p
                key={i}
                className={styles.questionItem}
                onClick={() => {
                  setSelectedSelection({ question: q.question, score: q.score });
                  setMessages((prev) => [...prev, { role: "user", content: `Q${i + 1}. ${q.question}에서 ${scoreLabels[q.score]}를 선택했어.` }]);
                  setShowAllQuestions(false);
                }}
              >
                Q{i + 1}. {q.question}
              </p>
            ))}
          </div>
        </div>
      )}

      <section className={styles.chatWindow}>
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <div key={i} className={styles.userMessage}>{msg.content}</div>
          ) : (
            <div key={i} className={styles.botMessageBox}>
              <div className={styles.Profile}><img src="/chat.png" alt="buddy" /></div>
              <div className={styles.botMessageText}>
                <p className={styles.botMessageName}>버디</p>
                <p className={styles.botMessage}>{msg.content}</p>
              </div>
            </div>
          )
        )}
        {isLoading && (
          <div className={styles.botMessageBox}>
            <div className={styles.Profile}><img src="/chat.png" alt="buddy" /></div>
            <div className={styles.botMessageText}>
              <p className={styles.botMessageName}>버디</p>
              <p className={styles.botLoading}>...</p>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </section>

      <section className={styles.inputSection}>
        {surveyId && (
          <button
            className={`${styles.profileBtn} ${showAllQuestions ? styles.rotated : ""}`}
            onClick={() => setShowAllQuestions((prev) => !prev)}
          >
            <span>+</span>
          </button>
        )}
        <input
          type="text"
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="버디에게 이야기해보세요"
          onKeyUp={(e) => { if (e.key === "Enter" && !e.repeat) { e.preventDefault(); handleSend(); } }}
        />
        <button className={styles.sendBtn} onClick={handleSend}>⬆</button>
      </section>
    </main>
  );
}