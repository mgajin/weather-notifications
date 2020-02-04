const Service = require('../models/Service');
const axios = require('axios');
const dotenv = require('dotenv');
const User = require('../models/User');

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

// @desc    Subscribe to mailing service
// @route   PUT /service/subscribe
exports.subscribe = async (req, res) => {
    if (!req.body) {
        return res.status(501).send('Body is empty');
    }

    const { username, city } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).send(`User ${username} not found`);
    }

    if (!user.subscription.list.includes(city)) {
        user.subscription.list.push(city);
    }
    user.subscription.status = true;
    user.save();

    res.status(200).json({ success: true, user });
};

// @desc    Remove city from subscription list
// @route   PUT /service/remove
exports.remove = async (req, res) => {
    const { username, city } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).send(`User ${username} not found`);
    }

    let list = user.subscription.list;

    if (list.includes(city)) {
        for (i in list) {
            if (list[i] === city) break;
        }
        list.splice(i, 1);
        user.subscription.list = list;
    }

    if (!user.subscription.list.length) {
        user.subscription.status = false;
    }

    user.save();

    res.status(200).json({ success: true, user });
};
