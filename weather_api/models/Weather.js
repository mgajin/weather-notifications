const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');

const WeatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: [true, 'City name is required']
    },
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
    humidity: {
        type: Number
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

// Load env variables
dotenv.config({
    path: './config/config.env'
});

// Fetch current weather from Open Weather API
WeatherSchema.statics.fetchData = async function(city) {
    const response = await axios.get(
        `${process.env.CURRENT_WEATHER}?q=${city}&appid=${process.env.API_KEY}`
    );

    if (!response) {
        return false;
    }

    const { description } = response.data.weather[0];
    const { main } = response.data;

    const weather = {
        city: city,
        description: description,
        temp: main.temp,
        min_temp: main.temp_min,
        max_temp: main.temp_max,
        feels_like: main.feels_like,
        updated: Date.now()
    };

    return weather;
};

module.exports = mongoose.model('Weather', WeatherSchema);
