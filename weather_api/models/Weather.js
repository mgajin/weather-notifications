const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: [true, 'City name is required']
    },
    // state: {
    //     type: String
    //     required: [true, 'State is required']
    // },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    temp: {
        type: Number,
        required: [true, 'Temperature is required']
    },
    min_temp: {
        type: Number,
        required: [true, 'Min temperature is required']
    },
    max_temp: {
        type: Number,
        required: [true, 'Max temperature is required']
    },
    feels_like: {
        type: Number,
        required: [true, 'Feels like is required']
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Weather', WeatherSchema);
