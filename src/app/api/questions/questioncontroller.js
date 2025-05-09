const Question = require('../questions/Question');

// Create a question
exports.createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findOne({ id: req.params.id });
    if (!question) return res.status(404).json({ success: false, message: 'Question not found' });

    res.status(200).json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const result = await Question.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ success: false, message: 'Question not found' });

    res.status(200).json({ success: true, message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
