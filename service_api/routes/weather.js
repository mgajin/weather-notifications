const exporess = require('express');

const {
    fetchWeather,
    getWeather,
    addWeather,
    updateWeather,
    getAll
} = require('../controllers/weather');

const router = exporess.Router();

router.route('/api/:city').get(fetchWeather);
router.route('/city').get(getWeather);
router
    .route('/')
    .post(addWeather)
    .put(updateWeather);

router.get('/all', getAll);

module.exports = router;
