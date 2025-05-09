const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  score: { type: Number, required: true }
});

const translationSchema = new mongoose.Schema({
  ar: {
    text: { type: String, required: true },
    options: [optionSchema]
  },
  en: {
    text: { type: String, required: true },
    options: [optionSchema]
  }
});

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  dimension: { type: String, required: true },
  translations: translationSchema
});

module.exports = mongoose.model('Question', questionSchema);
