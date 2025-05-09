import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Result from '../../../models/Result';  // استيراد الـ Model لحفظ النتيجة

// دالة لحفظ النتيجة
export const saveResult = async (data) => {
  try {
    const { userId, totalScore, answers, pageScores, personality } = data; // ✅ تم إضافة personality

    // التحقق من الاتصال بقاعدة البيانات إذا كان غير متصل بعد
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // التحقق إذا كان المستخدم قد أجاب من قبل
    const existingResult = await Result.findOne({ userId });
    if (existingResult) {
      return NextResponse.json({ message: 'user already answered' }, { status: 200 });
    }

    // إنشاء نتيجة جديدة للمستخدم
    const newResult = new Result({
      userId,
      totalScore,
      answers,
      pageScores,
      personality, // ✅ تم حفظ الشخصية هنا
    });

    // حفظ النتيجة في قاعدة البيانات
    await newResult.save();

    // إرجاع الاستجابة بنجاح
    return NextResponse.json({ message: 'success', result: newResult });
  } catch (error) {
    console.error('خطأ في حفظ النتيجة:', error);
    return NextResponse.json({ message: 'حدث خطأ أثناء حفظ النتيجة', error: error.message }, { status: 500 });
  }
};

// دالة لجلب النتيجة بناءً على userId
export const getResult = async (userId) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    const result = await Result.findOne({ userId });

    if (!result) {
      return NextResponse.json({ message: 'النتيجة غير موجودة لهذا المستخدم' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: 'خطأ في جلب النتيجة', error: error.message }, { status: 500 });
  }
};

// API handler
export async function POST(req) {
  try {
    const data = await req.json();
    return await saveResult(data); // ✅ يحتوي على personality
  } catch (error) {
    console.error('خطأ في معالجة الطلب:', error);
    return NextResponse.json({ message: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ message: 'userId مطلوب' }, { status: 400 });
    }

    return await getResult(userId);
  } catch (error) {
    console.error('خطأ في معالجة الطلب:', error);
    return NextResponse.json({ message: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}
