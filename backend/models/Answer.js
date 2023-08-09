// models/Answer.js
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

module.exports = mongoose.model('Answer', answerSchema);
