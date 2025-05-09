import { NextResponse } from 'next/server';
import { registerUser, loginUser } from '../controller';
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    const body = await req.json();

    if (!body || !body.action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    let result;

    if (body.action === 'signup') {
      result = await registerUser(body);
    } else if (body.action === 'login') {
      result = await loginUser(body);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}  
