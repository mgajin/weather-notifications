const axios = require('axios');
const dotenv = require('dotenv');
const Weather = require('../models/Weather');
const colors = require('colors');

// Load env variables
dotenv.config({
    path: './config/config.env'
});

// @desc    Get current weather from Open Weather API and store it to DB
// @route   GET /weather/v1/update/:city
exports.fetchWeather = async (req, res) => {
    let weather = Weather.updateDB();

    if (!weather) {
        return res.status(404).send('Not working...');
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
