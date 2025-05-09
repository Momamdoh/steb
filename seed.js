const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Question = require('../quiz/src/app/api/questions/Question'); // تأكد من المسار الصحيح للموديل الخاص بك

// Read JSON file from the new path
const questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'data', 'Questions.json'), 'utf-8'));

// Insert into DB
const seedQuestions = async () => {
  try {
    // Connect to DB
    await mongoose.connect('mongodb+srv://momamdoh4231:Mo0077@cluster0.8fcg0.mongodb.net/StebDB?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    // Clear the existing questions (optional)
    await Question.deleteMany();
    await Question.insertMany(questions.questions);
    console.log('✅ Seeding Done!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedQuestions();
