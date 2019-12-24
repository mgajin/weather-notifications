const exporess = require('express');

const { getServices, getService } = require('../controllers/service');

const router = exporess.Router();

router.route('/').get(getServices);

router.route('/:id').get(getService);

module.exports = router;
