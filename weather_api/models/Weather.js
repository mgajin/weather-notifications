const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');

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

// Update weathers in database
WeatherSchema.statics.updateDB = function() {
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

            weather = await this.findOne({ city });
            console.log(weather);

            if (!weather) {
                weather = await this.create(weatherBody);
                console.log(`Weather for ${city} saved to database`.bold);
            } else {
                weather = await this.findByIdAndUpdate(
                    weather._id,
                    weatherBody
                );
                console.log(`Weather for ${city} updated`.bold);
            }
        })
        .catch(err => console.log(err));

    return weather;
};

module.exports = mongoose.model('Weather', WeatherSchema);
