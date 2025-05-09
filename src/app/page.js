'use client'; // يجب أن يبقى هذا في الأعلى

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // استخدام useRouter من next/navigation


export default function Home() {
  const [isClient, setIsClient] = useState(false); // حالة لتحديد إذا كنا في بيئة العميل
  const router = useRouter(); // استخدام useRouter مباشرة من next/navigation

  // دالة للاتصال بقاعدة البيانات
  const connectToDB = async () => {
    try {
      const response = await fetch('/api/connectDb/connect');
      const data = await response.json();
      console.log(data.message); // طباعة رسالة النجاح أو الفشل في الاتصال

      // بعد الاتصال الناجح، التوجيه إلى صفحة login
      router.push('/login'); // التوجيه إلى صفحة login مباشرة بعد الاتصال الناجح
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  };

  useEffect(() => {
    // التحقق مما إذا كنا في بيئة العميل
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // الاتصال بقاعدة البيانات عند تحميل الصفحة
      connectToDB();
    }
  }, [isClient]); // [] لضمان تنفيذها مرة واحدة فقط

  // لا يتم عرض أي محتوى قبل التوجيه
  if (!isClient) {
    return null; // تجنب أي رندر قبل تحميل الصفحة في العميل
  }

  return null; // لا يوجد محتوى يتم عرضه على الصفحة قبل التوجيه
}
