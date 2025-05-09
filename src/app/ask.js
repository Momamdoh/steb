'use client'; // يجب أن يبقى هذا في الأعلى

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import QuestionList from './components/QuestionList';

export default function Home() {
  const [questionsData, setQuestionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // هنا يمكنك إضافة أي دوال أو منطق لتحميل البيانات إذا كان هناك شيء إضافي
  }, []);

  return (
    <>
      <Header />

      <section className="intro">
        <div className="card selected">
          <button>اختبار الشخصية</button>
          <h3>أنواع الشخصية</h3>
        </div>
        <div className="card">
          <img src="/images/assign (2).gif" alt="اختبار تطوير الذات" />
          <p>
            اكتشف الطريق لتطوير نفسك من خلال اختبارنا الفردي الذي يساعدك على فهم
            شخصيتك بشكل أعمق.
          </p>
        </div>
        <div className="card">
          <img src="/images/decision (2).gif" alt="تأثير الشخصية" />
          <p>
            تعرف على كيفية تأثير نوع شخصيتك في حياتك واتخاذ قراراتك اليومية في
            مختلف جوانب حياتك.
          </p>
        </div>
        <div className="card">
          <img src="/images/soft-skills (2).gif" alt="تطوير المهارات" />
          <p>أجب بصراحة وبدقة لتحصل على نتيجة تعكس شخصيتك الحقيقية بدقة.</p>
        </div>
      </section>

      <main className="main">
        {/* Progress bar */}
        <ProgressBar currentStep={currentPage} />

        {/* Questions Section */}
        <QuestionList
          questionsData={questionsData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Next Button Container */}
        <div id="next-button-container">
          {/* زر "التالي" لو حابب تضيفه هنا */}
        </div>
      </main>

      <Footer />
    </>
  );
}
