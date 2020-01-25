const exporess = require('express');

const {
    getWeather,
    getWeathers,
    subscribe,
    remove
} = require('../controllers/service');

const router = exporess.Router();

router.get('/weather/:city', getWeather);
router.get('/weathers', getWeathers);
router.put('/subscribe', subscribe);
router.put('/remove', remove);

module.exports = router;
