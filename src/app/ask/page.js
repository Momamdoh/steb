"use client";
import PersonalityGrid from "../components/PersonalityGrid";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuestionList from "../components/QuestionList";

export default function AskAndPersonality() {
  const [questionsData, setQuestionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [language, setLanguage] = useState("ar");
  const [selectedButton, setSelectedButton] = useState("personalityTest"); // حالة لتحديد الزر المختار
  const router = useRouter();

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang === "en" || storedLang === "ar") {
      setLanguage(storedLang);
    }

    fetch("http://localhost:3000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestionsData(data);
        console.log("Questions fetched successfully:", data);
      })
      .catch((err) => {
        console.error("Error loading questions:", err);
      });
  }, []);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName); // تحديث الزر المختار
  };

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />

      <section className="intro">
        <div className="card selected">
          <button
            onClick={() => handleButtonClick("personalityTest")}
            className={
              selectedButton === "personalityTest"
                ? "selected-button active"
                : "selected-button"
            }
          >
            {language === "ar" ? "اختبار الشخصية" : "Personality Test"}
          </button>
          <button
            onClick={() => handleButtonClick("personalityTypes")}
            className={
              selectedButton === "personalityTypes"
                ? "selected-button active"
                : "selected-button"
            }
          >
            <h3>{language === "ar" ? "أنواع الشخصية" : "Personality Types"}</h3>
          </button>
        </div>

        {/* المحتوى الذي يظل ثابتاً */}
        <div className="card">
          <img
            src="/images/assign (2).gif"
            alt={
              language === "ar" ? "اختبار تطوير الذات" : "Self-development Test"
            }
          />
          <p>
            {language === "ar"
              ? "اكتشف الطريق لتطوير نفسك من خلال اختبارنا الفردي الذي يساعدك على فهم شخصيتك بشكل أعمق."
              : "Discover your path to self-development with our personal test that helps you understand your personality more deeply."}
          </p>
        </div>
        <div className="card">
          <img
            src="/images/decision (2).gif"
            alt={language === "ar" ? "تأثير الشخصية" : "Personality Impact"}
          />
          <p>
            {language === "ar"
              ? "تعرف على كيفية تأثير نوع شخصيتك في حياتك واتخاذ قراراتك اليومية في مختلف جوانب حياتك."
              : "Learn how your personality type affects your daily life decisions in various aspects of life."}
          </p>
        </div>
        <div className="card">
          <img
            src="/images/soft-skills (2).gif"
            alt={language === "ar" ? "تطوير المهارات" : "Skill Development"}
          />
          <p>
            {language === "ar"
              ? "أجب بصراحة وبدقة لتحصل على نتيجة تعكس شخصيتك الحقيقية بدقة."
              : "Answer honestly and accurately to get a result that truly reflects your personality."}
          </p>
        </div>

        {/* عرض كلمة "مرحبا" تحت الـcard عندما يتم اختيار "أنواع الشخصية" */}
        {selectedButton === "personalityTypes" && (
          <div className="py-10">
          <PersonalityGrid language={language} />
          </div>
        )}

        {/* الأسئلة التي تظهر بناءً على الاختيارات */}
        {selectedButton === "personalityTest" && (
          <main className="main">
            <QuestionList
              questionsData={questionsData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              language={language}
              setLanguage={setLanguage}
            />
          </main>
        )}
      </section>

      <Footer />
    </>
  );
}
