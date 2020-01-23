const Service = require('../models/Service');
const axios = require('axios');
const dotenv = require('dotenv');

// Load env variables
dotenv.config({
    path: '../config/config.env'
});

// @desc    Get all available services
// @route   GET /service
exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();

        if (!services) {
            return res.status(404).send('No available services');
        }

        res.status(200).json({ success: true, services });
    } catch (error) {
        console.log(error);
    }
};

// @desc    Get single service by ID
// @route   GET /service/:id
exports.getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res
                .status(404)
                .send(`Service with ID of ${req.params.id} not found`);
        }

        res.status(200).json({ success: true, service });
    } catch (error) {}
};

// @desc    Get weather from weather service api
// @route   GET /service/weather/:city
exports.getWeather = async (req, res) => {
    const city = req.params.city;

    if (!city) {
        return res.status(404).send('Enter city name');
    }

    const response = await axios
        .get(`http://localhost:3000/weather/v1/city?name=${city}`)
        .catch(err => console.log(err));

    const weather = response.data.weather;

    if (!weather) {
        return res.status(404).send(`Weather for ${city} not found`);
    }

    res.status(200).json({ success: true, weather });
};

// @desc    Get all weathers from service api database
// @route   GET /service/weathers
exports.getWeathers = async (req, res) => {
    const response = await axios
        .get('http://localhost:3000/weather/v1')
        .catch(err => console.log(err));

    const weathers = response.data.weathers;

    if (!weathers.length) {
        return res.status(404).send('Database is empty');
    }

    res.status(200).json({ success: true, weathers });
};
