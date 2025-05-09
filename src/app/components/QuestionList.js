import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import { FaCheckCircle } from "react-icons/fa";

const QUESTIONS_PER_PAGE = 10;
const TOTAL_STEPS = 6;

function QuestionList({
  questionsData,
  currentPage,
  setCurrentPage,
  language,
  setLanguage,
}) {
  const [answers, setAnswers] = useState({});
  const [scorePerQuestion, setScorePerQuestion] = useState({});
  const [totalScoresPerPage, setTotalScoresPerPage] = useState([]);
  const [user, setUser] = useState({ name: "مستخدم" });
  const [finalResult, setFinalResult] = useState("");
  const [showResultCard, setShowResultCard] = useState(false);
  const [notification, setNotification] = useState(null);
  const [hasUserAnsweredBefore, setHasUserAnsweredBefore] = useState(false); // ⬅️ جديد

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser({ name: parsedUser.username || "مستخدم" });
      }
    }

    document.documentElement.setAttribute(
      "dir",
      language === "ar" ? "rtl" : "ltr"
    );
    document.body.style.direction = language === "ar" ? "rtl" : "ltr";

    // إضافة الكود الذي يتحقق من ما إذا كان المستخدم قد أجاب مسبقًا
    const checkUserAnswer = async () => {
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userId = parsedUser ? parsedUser._id || parsedUser.userId : null;

      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/results?userId=${userId}`
          );

          // تحقق من أن الاستجابة ناجحة (رمز الحالة 200)
          if (response.status === 200) {
            const data = await response.json();
            console.log("بيانات النتيجة:", data);
            setHasUserAnsweredBefore(true);
          } else {
            console.log("استجابة غير متوقعة، كود الحالة:", response.status);
            const text = await response.text();
            console.log("نص الاستجابة:", text);
          }
        } catch (error) {
          console.error("Error checking user data:", error);
        }
      }
    };

    checkUserAnswer(); // استدعاء الدالة عند تحميل الكومبوننت
  }, [language]);

  useEffect(() => {
    const finalPersonality = calculateFinalResult();
    const { personalityType, label } = finalPersonality;

    const resultText =
      language === "ar"
        ? `نتيجتك الشخصية هي: ${label.ar} (${personalityType})`
        : `Your personality result is: ${label.en} (${personalityType})`;

    setFinalResult(resultText);
  }, [answers, scorePerQuestion, language]);

  const totalPages = Math.min(
    TOTAL_STEPS,
    Math.ceil(questionsData.length / QUESTIONS_PER_PAGE)
  );
  const start = currentPage * QUESTIONS_PER_PAGE;
  const end = start + QUESTIONS_PER_PAGE;
  const currentQuestions = questionsData
    .sort((a, b) => a.id - b.id)
    .slice(start, end);

  const handleAnswerChange = (questionId, answerValue, scoreValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerValue }));
    setScorePerQuestion((prev) => ({ ...prev, [questionId]: scoreValue }));
  };

  const calculateFinalResult = () => {
    const results = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    for (const questionId in answers) {
      const answer = answers[questionId];
      const score = scorePerQuestion[questionId];
      const question = questionsData.find((q) => q.id === parseInt(questionId));

      if (!question) continue;

      const dimension = question.dimension;
      if (dimension === "EI") {
        if (answer.includes("agree")) results["E"] += score;
        else results["I"] += score;
      } else if (dimension === "SN") {
        if (answer.includes("agree")) results["S"] += score;
        else results["N"] += score;
      } else if (dimension === "TF") {
        if (answer.includes("agree")) results["T"] += score;
        else results["F"] += score;
      } else if (dimension === "JP") {
        if (answer.includes("agree")) results["J"] += score;
        else results["P"] += score;
      }
    }

    const personalityType = `${results.E > results.I ? "E" : "I"}${
      results.S > results.N ? "S" : "N"
    }${results.T > results.F ? "T" : "F"}${results.J > results.P ? "J" : "P"}`;

    const personalityLabels = {
      INTJ: { ar: "مهندس", en: "Architect" },
      INTP: { ar: "منطقي", en: "Logician" },
      ENTJ: { ar: "قائد", en: "Commander" },
      ENFJ: { ar: "محاور", en: "Protagonist" },
      INFJ: { ar: "محامي", en: "Advocate" },
      INFP: { ar: "وسيط", en: "Mediator" },
      ENFP: { ar: "بطل", en: "Campaigner" },
      ISFP: { ar: "مناضل", en: "Adventurer" },
      ESFP: { ar: "مبدع", en: "Entertainer" },
      ISTJ: { ar: "لوجستي", en: "Logistician" },
      ESTJ: { ar: "تنفيذي", en: "Executive" },
      ISFJ: { ar: "مدافع", en: "Defender" },
      ESFJ: { ar: "قنصل", en: "Consul" },
      ISTP: { ar: "مغامر", en: "Virtuoso" },
      ESTP: { ar: "رائد عمل", en: "Entrepreneur" },
      ENTP: { ar: "محاور", en: "Debater" },
    };

    const label = personalityLabels[personalityType] || {
      ar: "شخصية غير معروفة",
      en: "Unknown personality",
    };

    return { personalityType, label };
  };

  const allQuestionsAnswered = () => {
    return currentQuestions.every((question) => answers[question.id]);
  };

  const handleNext = async () => {
    if (!allQuestionsAnswered()) {
      setNotification({
        type: "error",
        message:
          language === "ar"
            ? "من فضلك أجب على جميع الأسئلة"
            : "Please answer all questions",
      });
      return;
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      const finalPersonality = calculateFinalResult();
      const { personalityType, label } = finalPersonality;
      const personalityName = language === "ar" ? label.ar : label.en;

      const resultText =
        language === "ar"
          ? `نتيجتك الشخصية هي: ${label.ar} (${personalityType})`
          : `Your personality result is: ${label.en} (${personalityType})`;

      setFinalResult(resultText);
      setShowResultCard(true);

      let totalScore = 0;
      const pageScores = [];

      for (let i = 0; i < totalPages; i++) {
        const start = i * QUESTIONS_PER_PAGE;
        const end = start + QUESTIONS_PER_PAGE;
        const questionsForPage = questionsData.slice(start, end);

        let pageScore = 0;
        questionsForPage.forEach((q) => {
          const score = scorePerQuestion[q.id];
          if (typeof score === "number") pageScore += score;
        });

        pageScores.push({ page: i + 1, score: pageScore });
        totalScore += pageScore;
      }

      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userId = parsedUser ? parsedUser._id || parsedUser.userId : null;

      if (!userId) {
        setNotification({
          type: "error",
          message:
            language === "ar"
              ? "لم يتم العثور على بيانات المستخدم"
              : "User data not found",
        });
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            totalScore,
            personality: personalityType, // <-- فقط القيمة النصية، وليس الكائن الكامل
            answers: Object.keys(answers).map((key) => ({
              questionId: key,
              answer: answers[key],
              score: scorePerQuestion[key],
            })),
            pageScores,
          }),
        });

        const data = await response.json();

        if (data.message === "success") {
          setNotification({
            type: "success",
            message:
              (language === "ar"
                ? "تم حفظ النتيجة بنجاح"
                : "Result saved successfully") +
              `!\n` +
              (language === "ar" ? "شكرًا لك" : "Thank you") +
              `, ${parsedUser?.name || ""}!`,
          });
        } else if (data.message === "user already answered") {
          setNotification({
            type: "info",
            message:
              language === "ar"
                ? `لقد قمت بالإجابة مسبقًا، ${parsedUser?.name || ""}!`
                : `You've already answered, ${parsedUser?.name || ""}!`,
          });
          setHasUserAnsweredBefore(true);
        } else {
          setNotification({
            type: "error",
            message:
              language === "ar"
                ? "حدث خطأ أثناء حفظ النتيجة"
                : "An error occurred while saving the result",
          });
        }
      } catch (error) {
        setNotification({
          type: "error",
          message:
            language === "ar"
              ? "خطأ في الاتصال بالخادم"
              : "Server connection error",
        });
      }
    }
  };

  const handleCloseCard = () => {
    setShowResultCard(false);
  };

  return (
    <section
      className="questions"
      id="questions-container"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
     {hasUserAnsweredBefore ? (
  <div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
    {language === "ar"
      ? `لقد قمت بالإجابة على هذا الاختبار مسبقًا، ${user.name}، شكرًا لمشاركتك!`
      : `You have already completed this test, ${user.name}. Thank you!`}
    {/* اطبع النتيجة الشخصية */}
    <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "bold" }}>
      {language === "ar"
        ? ` ${finalResult}` // أو الشخصية مثل "وسيط"
        : `${finalResult}`} {/* أو الشخصية مثل "Mediator" */}
    </div>
  </div>
) : (
        <>
          <ProgressBar currentStep={currentPage} language={language} />
          {currentQuestions.map((question, index) => {
            const questionText =
              question.translations?.[language]?.text || question.text;
            const options = question.translations?.[language]?.options || [];

            return (
              <div className="question" key={question.id}>
                <p>{questionText}</p>
                <div className="options">
                  {options.map((option) => (
                    <label
                      key={option.value}
                      className={`option-label ${
                        answers[question.id] === option.value ? "selected" : ""
                      } ${option.value}`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        onChange={() =>
                          handleAnswerChange(
                            question.id,
                            option.value,
                            option.score
                          )
                        }
                        checked={answers[question.id] === option.value}
                        className="option-input"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                {index < currentQuestions.length - 1 && <hr />}
              </div>
            );
          })}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <button
              onClick={handleNext}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "200px",
                height: "50px",
                fontSize: "16px",
                cursor: "pointer",
                marginBottom: "40px",
                backgroundColor: "#003d85",
                color: "white",
                border: "none",
                borderRadius: "8px",
              }}
              disabled={!allQuestionsAnswered()}
            >
              {language === "ar" ? "التالي" : "Next"}
              <FaArrowLeft className="arrow" />
            </button>
          </div>
        </>
      )}

      {showResultCard && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            width: "300px",
            textAlign: "center",
          }}
        >
          <h3>{finalResult}</h3>
          <button
            onClick={handleCloseCard}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#003d85",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {language === "ar" ? "إغلاق" : "Close"}
          </button>
        </div>
      )}

      {notification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: notification.type === "error" ? "red" : "green",
            color: "white",
            padding: "15px",
            borderRadius: "5px",
            fontSize: "16px",
            zIndex: 1000,
          }}
        >
          {notification.message}
        </div>
      )}
    </section>
  );
}

export default QuestionList;
