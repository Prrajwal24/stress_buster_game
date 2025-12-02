const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const scoreRoutes = require('./routes/scores');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from client directory
const clientPath = path.join(__dirname, '../client');
app.use(express.static(clientPath));

// MongoDB connection (optional - game works without it)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/seahorse-game';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
})
.then(() => {
    console.log('✅ Connected to MongoDB');
})
.catch((error) => {
    console.warn('⚠️  MongoDB not available:', error.message);
    console.log('💡 Game will still work, but high scores won\'t be saved.');
    console.log('💡 To enable MongoDB: Install MongoDB or set MONGODB_URI environment variable');
});

// API Routes (must be before catch-all route)
app.use('/api/scores', scoreRoutes);

// Handle client-side routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${path.join(__dirname, '../client')}`);
});

