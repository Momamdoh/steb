import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Question from '../questions/Question'; // تأكد من أن المسار صحيح لموديل الأسئلة

// جلب جميع الأسئلة (GET)
export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const questions = await Question.find(); // جلب الأسئلة من قاعدة البيانات
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ message: 'حدث خطأ أثناء جلب الأسئلة', error }, { status: 500 });
  }
}

// إنشاء سؤال جديد (POST)
export async function POST(request) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const body = await request.json();
    const newQuestion = new Question(body);
    await newQuestion.save();
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'حدث خطأ أثناء إضافة السؤال', error }, { status: 400 });
  }
}
