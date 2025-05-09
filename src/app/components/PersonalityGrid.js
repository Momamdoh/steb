'use client';

const roles = [
  {
    ar: {
      title: 'محاور',
      code: 'ENTP-A / ENTP-T',
      description: 'المفكرين الفضوليين والأذكياء الذين لا يمكنهم مقاومة أي نوع من التحدي الفكري.',
    },
    en: {
      title: 'Debater',
      code: 'ENTP-A / ENTP-T',
      description: 'Curious and intelligent thinkers who can’t resist any kind of intellectual challenge.',
    },
    icon: '/images/A.gif',
    colorClass: 'bg-blue',
  },
  {
    ar: {
      title: 'قائد',
      code: 'ENTJ-A / ENTJ-T',
      description: 'القادة الجريئون والمبتكرون وذوو الإرادة، يجدون دائمًا الحل للمشكلات – أو يصنعونه.',
    },
    en: {
      title: 'Commander',
      code: 'ENTJ-A / ENTJ-T',
      description: 'Bold, innovative, and determined leaders who always find a solution to problems – or make one.',
    },
    icon: '/images/B.gif',
    colorClass: 'bg-blue',
  },
  {
    ar: {
      title: 'منطقي',
      code: 'INTP-A / INTP-T',
      description: 'المخترعون المبتكرون ذو عطش جامح للمعرفة.',
    },
    en: {
      title: 'Logician',
      code: 'INTP-A / INTP-T',
      description: 'Innovative inventors with an insatiable thirst for knowledge.',
    },
    icon: '/images/C.gif',
    colorClass: 'bg-blue',
  },
  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/D.gif',
    colorClass: 'bg-blue',
  },
  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/A.gif',
    colorClass: 'bg-green',
  },
  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/B.gif',
    colorClass: 'bg-green',
  },
  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/C.gif',
    colorClass: 'bg-green',
  },
  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/D.gif',
    colorClass: 'bg-green',
  },

  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/A.gif',
    colorClass: 'bg-lightblue',
  },
  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/B.gif',
    colorClass: 'bg-lightblue',
  },
  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/D.gif',
    colorClass: 'bg-lightblue',
  },
  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/C.gif',
    colorClass: 'bg-lightblue',
  },
  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/A.gif',
    colorClass: 'bg-orange',
  },
  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/B.gif',
    colorClass: 'bg-orange',
  },
  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/C.gif',
    colorClass: 'bg-orange',
  },
  {
    ar: {
      title: 'مهندس',
      code: 'INTJ-A / INTJ-T',
      description: 'الخياليون والمفكرون الاستراتيجيون، لديهم خطة لكل شيء.',
    },
    en: {
      title: 'Architect',
      code: 'INTJ-A / INTJ-T',
      description: 'Strategic thinkers with a plan for everything.',
    },
    icon: '/images/D.gif',
    colorClass: 'bg-orange',
  },
];

export default function PersonalityGrid({ language }) {
  return (
    <div>
      {/* أول قسم */}
      <h2 className="section-title">{language === 'ar' ? 'محللون' : 'Analysts'}</h2>
      <div className="grid-container">
        {roles.slice(0, 4).map((role, index) => (
          <div className="card-wrapper" key={index}>
            <div className={`card-back ${role.colorClass}`}></div>
            <div className="card-front">
              <div className="icon">
                <img src={role.icon} alt={role[language].title} width={70} height={70} />
              </div>
              <h3 className="titledarkblue">{role[language].title}</h3>
              <p className="code">{role[language].code}</p>
              <p className="description">{role[language].description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* القسم الثاني */}
      <h2 className="section-green">{language === 'ar' ? 'الدبلوماسيون' : 'Diplomats'}</h2>
      <div className="grid-container">
        {roles.slice(4, 8).map((role, index) => (
          <div className="card-wrapper" key={index}>
            <div className={`card-back ${role.colorClass}`}></div>
            <div className="card-front">
              <div className="icon">
                <img src={role.icon} alt={role[language].title} width={80} height={80} />
              </div>
              <h3 className="titlegreen">{role[language].title}</h3>
              <p className="code">{role[language].code}</p>
              <p className="description">{role[language].description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* القسم الثالث */}
      <h2 className="section-lightblue">{language === 'ar' ? 'المنظمون' : 'Sentinels'}</h2>
      <div className="grid-container">
        {roles.slice(8, 12).map((role, index) => (
          <div className="card-wrapper" key={index}>
            <div className={`card-back ${role.colorClass}`}></div>
            <div className="card-front">
              <div className="icon">
                <img src={role.icon} alt={role[language].title} width={70} height={70} />
              </div>
              <h3 className="titlelightblue">{role[language].title}</h3>
              <p className="code">{role[language].code}</p>
              <p className="description">{role[language].description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* القسم الرابع */}
      <h2 className="section-orange">{language === 'ar' ? 'مستكشفون' : 'Explorers'}</h2>
      <div className="grid-container">
        {roles.slice(12).map((role, index) => (
          <div className="card-wrapper" key={index}>
            <div className={`card-back ${role.colorClass}`}></div>
            <div className="card-front">
              <div className="icon">
                <img src={role.icon} alt={role[language].title} width={70} height={70} />
              </div>
              <h3 className="titleorange">{role[language].title}</h3>
              <p className="code">{role[language].code}</p>
              <p className="description">{role[language].description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
