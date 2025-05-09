import React from 'react';

export default function Header({ language, setLanguage }) {
  // وظيفة لتغيير اللغة
  const handleLanguageChange = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';  // تغيير اللغة من 'ar' إلى 'en' والعكس
    setLanguage(newLanguage);  // تعيين اللغة الجديدة
    localStorage.setItem('language', newLanguage);  // حفظ اللغة في localStorage
  };

  return (
    <header className="header">
      <div className="logo">
        <img
          src="./images/Group.png"
          alt="STEB Logo"
          style={{ width: '172.565px', height: '54.872px', flexShrink: '0' }}
        />
      </div>
      <nav className="nav">
        <span className="main-link">الرئيسية</span>

        {/* قسم تغيير اللغة */}
        <span className="lang-wrapper">
          <span
            className="lang-code"
            onClick={handleLanguageChange}  // عند النقر يتم تغيير اللغة
            style={{ cursor: 'pointer', marginRight: '5px' }}
          >
            {language === 'ar' ? 'EN' : 'AR'}  {/* إذا كانت اللغة "عربية" يعرض "EN"، وإذا كانت "إنجليزية" يعرض "AR" */}
          </span>
          <img src="./images/flag.png" alt="Flag" width="24" />
        </span>

        {/* أيقونة البحث */}
        <span className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
          >
            <path
              d="M26.5835 26.5833L34.8335 34.8333M29.3335 18.3333C29.3335 24.4085 24.4086 29.3333 18.3335 29.3333C12.2584 29.3333 7.3335 24.4085 7.3335 18.3333C7.3335 12.2582 12.2584 7.33334 18.3335 7.33334C24.4086 7.33334 29.3335 12.2582 29.3335 18.3333Z"
              stroke="#535559"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {/* أيقونة الجرس */}
        <span className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
          >
            <path
              d="M21.9998 7.33333C16.9372 7.33333 12.8332 11.4374 12.8332 16.5V21.5533C12.8332 23.1073 11.7489 24.4191 10.6785 25.5457C9.74149 26.532 9.1665 27.8655 9.1665 29.3333C9.1665 30.3459 9.98732 31.1667 10.9998 31.1667H32.9998C34.0124 31.1667 34.8332 30.3459 34.8332 29.3333C34.8332 27.8655 34.2582 26.532 33.3212 25.5457C32.2508 24.4191 31.1665 23.1073 31.1665 21.5533V16.5C31.1665 11.4374 27.0624 7.33333 21.9998 7.33333ZM21.9998 7.33333V5.5M25.2954 36.4407C24.9904 37.0661 24.5137 37.5917 23.9211 37.9563C23.3285 38.3209 22.6444 38.5094 21.9486 38.4996C21.2529 38.4899 20.5743 38.2825 19.9921 37.9015C19.4099 37.5205 18.9481 36.9817 18.6607 36.348"
              stroke="#535559"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {/* صورة المستخدم */}
        <span className="avatar">JW</span>
      </nav>
    </header>
  );
}
