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
    wind: {
        type: Number
    },
    // date: {},
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
    let { temp, temp_min, temp_max, feels_like, humidity } = response.data.main;
    const { speed } = response.data.wind;

    // Convert K to C
    temp = temp.toFixed(0) - 273;
    temp_min = temp_min.toFixed(0) - 273;
    temp_max = temp_max.toFixed(0) - 273;
    feels_like = feels_like.toFixed(0) - 273;

    const weather = {
        city: city,
        description: description,
        temp: temp,
        min_temp: temp_min,
        max_temp: temp_max,
        feels_like: feels_like,
        humidity: humidity,
        wind: speed,
        updated: new Date()
    };

    return weather;
};

module.exports = mongoose.model('Weather', WeatherSchema);
