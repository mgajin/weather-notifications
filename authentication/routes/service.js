const exporess = require('express');

const {
    getServices,
    getWeather,
    getWeathers,
    subscribe,
    remove
} = require('../controllers/service');

const router = exporess.Router();

router.get('/', getServices);
router.get('/weather/:city', getWeather);
router.get('/weathers', getWeathers);
router.put('/subscribe', subscribe);
router.put('/remove', remove);

module.exports = router;
