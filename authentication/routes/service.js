const exporess = require('express');

const {
    getServices,
    // getService,
    getWeather,
    getWeathers
} = require('../controllers/service');

const router = exporess.Router();

router.get('/', getServices);
// router.get('/:id', getService);
router.get('/weather/:city', getWeather);
router.get('/weathers', getWeathers);

module.exports = router;
