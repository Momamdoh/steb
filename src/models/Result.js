import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // ربط النتيجة بالمستخدم
    required: true
  },
  totalScore: {
    type: Number,
    required: true
  },
  personality: {
    type: String,  // إضافة حقل الشخصية
    required: true
  },
  pageScores: [
    {
      page: { type: Number, required: true },
      score: { type: Number, required: true }
    }
  ],
  answers: [{
    questionId: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Result || mongoose.model('Result', resultSchema);
