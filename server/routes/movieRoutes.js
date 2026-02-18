const express = require('express');
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/movies', authMiddleware, async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: { api_key: process.env.TMDB_API_KEY }
    });
    
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
