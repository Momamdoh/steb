import User from './User';
import bcrypt from 'bcryptjs';

export const registerUser = async (data) => {
  const { username, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  const { password: _, ...userData } = newUser.toObject();

  return {
    message: 'success',
    data: userData,
  };
};

export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const { password: _, ...userData } = user.toObject();

  return {
    message: 'success',
    data: userData,
  };
};
