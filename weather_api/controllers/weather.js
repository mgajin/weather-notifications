const axios = require('axios');
const dotenv = require('dotenv');
const Weather = require('../models/Weather');
const colors = require('colors');
const schedule = require('node-schedule');

// Load env variables
dotenv.config({
    path: './config/config.env'
});

// @desc    Get current weather from Open Weather API and store it to DB
// @route   GET /v1/fetch/:city
exports.fetchWeather = async (req, res) => {
    const city = req.params.city;

    let weather = await Weather.fetchData(city);

    if (!weather) {
        return res.status(404).send(`Weather for ${city} not found`);
    }

    res.status(201).json({ success: true, weather });
};

// @desc    Get weather from DB
// @route   GET /v1/:city
exports.getWeather = async (req, res) => {
    let weather = await Weather.findOne({ city: req.params.city });

    if (!weather) {
        let response = await axios.post('http://localhost:3002/weather', {
            city: req.params.city
        });

        if (!response) {
            return res
                .status(404)
                .send(`Weather for ${req.params.city} not available`);
        }

        weather = response.data.weather;
    }

    res.status(200).json({ success: true, weather });
};

// @desc    Get weather data and save it to database
// @route   POST /v1
exports.addWeather = async (req, res) => {
    const city = req.body.city;

    let weather = await Weather.findOne({ city });

    if (!weather) {
        const data = await Weather.fetchData(city);
        if (!data) {
            return res.status(404).send(`Weather for ${city} not available`);
        }
        weather = await Weather.create(data);
        console.log(`Weather for ${city} added to database`);
    }

    res.status(201).json({ success: true, weather });
};

// @desc    Get weather data and update DB
// @route   PUT /v1
exports.updateWeather = async (req, res) => {
    const city = req.body.city;

    let weather = await Weather.findOne({ city });

    if (!weather) {
        return res.status(404).send(`Weather for ${city} not found`);
    }

    const data = await Weather.fetchData(city);

    if (!data) {
        return res.status(404).send(`Weather for ${city} not available`);
    }

    weather = await Weather.findByIdAndUpdate(weather._id, data);

    res.status(201).json({ success: true, weather });
};

// Update database every minute
let job = schedule.scheduleJob('*/1 * * * *', async () => {
    let weathers = await Weather.find();

    for (let i in weathers) {
        let weather = weathers[i];

        let response = await axios.put(`http://localhost:3002/weather`, {
            city: weather.city
        });

        if (!response) {
            console.log(`Unable to update weather for ${city}`.red);
        }
    }
    console.log('Database updated...'.bold);
});
