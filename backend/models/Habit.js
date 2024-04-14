const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Habit', habitSchema);