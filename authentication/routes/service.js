const exporess = require('express');

const {
    getServices,
    getService,
    getWeather
} = require('../controllers/service');

const router = exporess.Router();

router.route('/').get(getServices);

router.route('/:id').get(getService);

router.route('/weather/:city').get(getWeather);

module.exports = router;
