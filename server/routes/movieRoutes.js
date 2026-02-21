const express = require('express');
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Helper to fetch from TMDB
const fetchFromTMDB = async (endpoint, params = {}) => {
  const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
    params: {
      api_key: process.env.TMDB_API_KEY,
      ...params
    }
  });
  return response.data.results;
};

// Available Categories in Your API
router.get('/movies/trending', authMiddleware, async (req, res) => {
  try {
    const movies = await fetchFromTMDB('/trending/movie/week');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/movies/popular', authMiddleware, async (req, res) => {
  try {
    const movies = await fetchFromTMDB('/movie/popular');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/movies/top-rated', authMiddleware, async (req, res) => {
  try {
    const movies = await fetchFromTMDB('/movie/top_rated');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/movies/action', authMiddleware, async (req, res) => {
  try {
    const movies = await fetchFromTMDB('/discover/movie', { with_genres: 28 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/movies/comedy', authMiddleware, async (req, res) => {
  try {
    const movies = await fetchFromTMDB('/discover/movie', { with_genres: 35 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// For legacy support or "All Movies"
router.get('/movies', authMiddleware, async (req, res) => {
  try {
    const movies = await fetchFromTMDB('/movie/popular');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
