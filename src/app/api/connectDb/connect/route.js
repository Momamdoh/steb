import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return; // إذا كان الاتصال قائمًا بالفعل
    await mongoose.connect(MONGO_URI); // الاتصال بقاعدة البيانات
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Database connection failed');
  }
};

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: 'Connected to MongoDB successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to connect to MongoDB' }, { status: 500 });
  }
}
