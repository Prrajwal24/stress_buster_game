const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// GET /api/scores - Get top scores
router.get('/', async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (Score.db.readyState !== 1) {
            return res.json([]); // Return empty array if DB not connected
        }

        const limit = parseInt(req.query.limit) || 10;
        const scores = await Score.find()
            .sort({ score: -1, date: -1 })
            .limit(limit)
            .select('name score date')
            .lean();

        res.json(scores);
    } catch (error) {
        console.error('Error fetching scores:', error);
        // Return empty array instead of error so game still works
        res.json([]);
    }
});

// POST /api/scores - Save a new score
router.post('/', async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (Score.db.readyState !== 1) {
            return res.status(503).json({ error: 'Database not available. High scores feature disabled.' });
        }

        const { name, score } = req.body;

        if (!name || typeof score !== 'number' || score < 0) {
            return res.status(400).json({ error: 'Invalid name or score' });
        }

        const newScore = new Score({
            name: name.trim().substring(0, 20),
            score: Math.floor(score)
        });

        const savedScore = await newScore.save();
        res.status(201).json(savedScore);
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ error: 'Failed to save score' });
    }
});

// GET /api/scores/top - Get top N scores (alternative endpoint)
router.get('/top', async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (Score.db.readyState !== 1) {
            return res.json([]); // Return empty array if DB not connected
        }

        const limit = parseInt(req.query.limit) || 10;
        const scores = await Score.find()
            .sort({ score: -1 })
            .limit(limit)
            .select('name score date')
            .lean();

        res.json(scores);
    } catch (error) {
        console.error('Error fetching top scores:', error);
        res.json([]); // Return empty array instead of error
    }
});

module.exports = router;

