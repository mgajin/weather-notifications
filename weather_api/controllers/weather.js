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

// Update weathers in database
let job = schedule.scheduleJob('*/1 * * * *', () => {
    const city = 'New York';
    let weather;

    axios
        .get(
            `${process.env.CURRENT_WEATHER}?q=${city}&appid=${process.env.API_KEY}`
        )
        .then(async response => {
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

            weather = await Weather.findOne({ city });

            if (!weather) {
                weather = await Weather.create(weatherBody);
            } else {
                weather = await Weather.findByIdAndUpdate(
                    weather._id,
                    weatherBody
                );
            }
            console.log('Database updated...'.bold);
        })
        .catch(err => console.log(err));
});
