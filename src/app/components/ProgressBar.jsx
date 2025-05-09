import React from 'react';

export default function ProgressBar({ currentStep, language }) {
  const steps = language === 'ar' 
    ? [
        'المرحلة الأولى',
        'المرحلة الثانية',
        'المرحلة الثالثة',
        'المرحلة الرابعة',
        'المرحلة الخامسة',
        'المرحلة السادسة'
      ] 
    : [
        'Step 1',
        'Step 2',
        'Step 3',
        'Step 4',
        'Step 5',
        'Step 6'
      ];

  // تحقق إذا كان قد تم الوصول للمرحلة السادسة
  const isLastStepCompleted = currentStep >= steps.length - 1;

  return (
    <div className="container-round" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="progress-bar">
        {steps.map((step, index) => {
          let stepClass = '';

          if (index < currentStep) {
            stepClass = 'completed';  // المرحلة المنتهية
          } else if (index === currentStep) {
            stepClass = 'current';  // المرحلة الحالية
          } else {
            stepClass = 'next';  // المرحلة التالية
          }

          // إذا كنا في المرحلة السادسة و قد تم الوصول إليها أو تجاوزها
          if (isLastStepCompleted && index === steps.length - 1) {
            stepClass = 'completed';
          }

          return (
            <div key={index} className={`step ${stepClass}`}>
              <span className="label">{step}</span>
              <span className={`circle ${stepClass === 'completed' ? 'completed' : ''}`}>
                {stepClass === 'completed' ? '✔' : ''}
              </span>
            </div>
          );
        })}
      </section>
    </div>
  );
}
