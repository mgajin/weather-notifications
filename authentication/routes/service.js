const exporess = require('express');

const {
    getServices,
    getService,
    getWeather
} = require('../controllers/service');

const router = exporess.Router();

router.get('/', getServices);
router.get('/:id', getService);
router.get('/weather/:city', getWeather);

module.exports = router;
