import Result from '../../../models/Result';  // استيراد نموذج النتيجة
import User from '../../../models/User';  // استيراد نموذج المستخدم
import mongoose from 'mongoose';  // استيراد mongoose للاتصال بقاعدة البيانات

const saveResult = async (req, res) => {
  try {
    const { userId, totalScore, answers, pageScores, personality } = req.body;  // الحصول على البيانات من الطلب

    // التأكد من وجود المستخدم في قاعدة البيانات
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    // التحقق مما إذا كانت النتيجة موجودة مسبقًا
    const existingResult = await Result.findOne({ userId });
    if (existingResult) {
      return res.status(200).json({ message: 'user already answered' });  // إذا كانت النتيجة موجودة
    }

    const newResult = new Result({
      userId: user._id,
      totalScore: totalScore,
      answers: answers,
      pageScores: pageScores,
      personality: personality,  // حفظ اسم الشخصية
    });

    const savedResult = await newResult.save();
    return res.status(201).json({ message: 'success', result: savedResult });  // إرجاع النتيجة المحفوظة مع رسالة success
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'حدث خطأ أثناء حفظ النتيجة' });
  }
};


// دالة لجلب النتيجة بناءً على userId
const getResult = async (req, res) => {
  try {
    const { userId } = req.query;  // الحصول على userId من الـ query

    if (!userId) {
      return res.status(400).json({ message: 'userId مطلوب' });
    }

    // البحث عن النتيجة بناءً على userId
    const result = await Result.findOne({ userId });

    if (!result) {
      return res.status(404).json({ message: 'النتيجة غير موجودة لهذا المستخدم' });
    }

    return res.status(200).json( result);  // إرجاع النتيجة إذا كانت موجودة
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'حدث خطأ أثناء جلب النتيجة' });
  }
};

// التعامل مع الطلبات HTTP في ملف واحد
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // إذا كان الطلب POST، قم بحفظ النتيجة
    return await saveResult(req, res);
  } else if (req.method === 'GET') {
    // إذا كان الطلب GET، قم بجلب النتيجة باستخدام userId من الـ query
    return await getResult(req, res);
  } else {
    // إذا كان هناك نوع طلب آخر
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
