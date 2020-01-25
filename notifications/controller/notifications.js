const axios = require('axios');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load config vars
dotenv.config({
    path: './config/config.env'
});

// @desc    Get subscribed users from service 1
exports.getUsers = async () => {
    try {
        let response = await axios.get(`http://localhost:3001/v1/users`);

        let users = response.data.users;

        if (!users) {
            console.log('No users');
            return null;
        }

        return users;
    } catch (error) {
        console.log(error);
    }
};

exports.getWeather = async city => {
    try {
        let response = await axios.get(
            `http://localhost:3002/v1/city?name=${city}`
        );

        let weather = response.data.weather;

        if (!weather) {
            console.log(`Weather for ${city} not found`);
            return null;
        }
        return weather;
    } catch (error) {
        console.log(error);
    }
};
