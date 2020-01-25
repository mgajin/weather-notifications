const express = require('express');

const {
    fetchWeather,
    getWeather,
    addWeather,
    updateWeather,
    getWeathers
} = require('../controllers/weather');

const router = express.Router();

router.route('/api/:city').get(fetchWeather);
router.route('/city').get(getWeather);
router
    .route('/')
    .post(addWeather)
    .put(updateWeather)
    .get(getWeathers);

module.exports = router;
