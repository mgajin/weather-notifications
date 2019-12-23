const exporess = require('express');

const { fetchWeather, getWeather } = require('../controllers/weather');

const router = exporess.Router();

router.route('/update').get(fetchWeather);
router.route('/').get(getAll);
router.route('/:cityId').get(getWeather);

module.exports = router;
