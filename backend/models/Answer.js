const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question: String,
  answer: String,
  keywords: [String],
});

// Add an index to the question field
answerSchema.index({ question: 1 });

// Create a method to find an answer by question
answerSchema.statics.findByQuestion = async function (question) {
  return await this.findOne({ question }).exec();
};

module.exports = mongoose.model('Answer', answerSchema);
