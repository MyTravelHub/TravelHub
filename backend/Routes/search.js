// routes/search.js
const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');

router.get('/', async (req, res) => {
  const query = req.query.q; // The user's search query
  try {
    const result = await Answer.findOne({ question: query });
    if (result) {
      res.json({ answer: result.answer });
    } else {
      res.json({ answer: 'No matching answer found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

module.exports = router;
