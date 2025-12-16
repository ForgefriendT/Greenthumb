const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    wateringFreq: {
        type: Number,
        required: true,
        // Frequency in days
    },
    lastWatered: {
        type: Date,
        default: Date.now,
    },
    nextWateringDate: {
        type: Date,
    },
    image: {
        type: String, // URL to image
    },
    notes: {
        type: String,
    },
});

module.exports = mongoose.model('Plant', PlantSchema);
