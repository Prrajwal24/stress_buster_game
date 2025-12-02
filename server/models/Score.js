const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    score: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
scoreSchema.index({ score: -1 });
scoreSchema.index({ date: -1 });

module.exports = mongoose.model('Score', scoreSchema);

