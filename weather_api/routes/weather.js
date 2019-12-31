const exporess = require('express');

const {
    fetchWeather,
    getWeather,
    addWeather,
    updateWeather
} = require('../controllers/weather');

const router = exporess.Router();

router.route('/fetch/:city').get(fetchWeather);
router.route('/:city').get(getWeather);
router
    .route('/')
    .post(addWeather)
    .put(updateWeather);

module.exports = router;
