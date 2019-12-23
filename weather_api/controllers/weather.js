const axios = require('axios');
const dotenv = require('dotenv');
const Weather = require('../models/Weather');
const colors = require('colors');

// Load env variables
dotenv.config({
    path: './config/config.env'
});

// @desc    Get current weather from Open Weather API and store it to DB
// @route   GET /weather/v1/update
exports.fetchWeather = async (req, res) => {
    const city = req.body.city;

    if (!city) {
        return res.status(404).send('Enter city name');
    }

    const response = await axios.get(
        `${process.env.CURRENT_WEATHER}?q=${city}&appid=${process.env.API_KEY}`
    );

    if (!response) {
        return res.status(404).send(`Weather for ${city} not found`);
    }

    const { description } = response.data.weather[0];
    const { main } = response.data;

    const weatherBody = {
        city,
        description: description,
        temp: main.temp,
        min_temp: main.temp_min,
        max_temp: main.temp_max,
        feels_like: main.feels_like,
        updated: Date.now()
    };

    let weather = await Weather.findOne({ city });

    if (!weather) {
        weather = await Weather.create(weatherBody);
        console.log(`Weather for ${city} saved to database`.bold);
    } else {
        weather = await Weather.findByIdAndUpdate(weather._id, weatherBody);
        console.log(`Weather for ${city} updated`.bold);
    }

    res.status(201).json({ success: true, weather });
};

// @desc    Get weather from DB
// @route   GET weather/v1/:city
exports.getWeather = async (req, res) => {
    try {
        let weather = await Weather.findOne({ city: req.params.city });

        if (!weather) {
            return res
                .status(404)
                .send(`Weather for ${req.params.city} not available`);
        }

        res.status(200).json({ success: true, weather });
    } catch (error) {
        console.log(error);
    }
};
