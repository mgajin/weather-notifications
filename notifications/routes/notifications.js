const express = require('express');

const { getUsers, sendMail } = require('../controllers/notifications');

const router = express.Router();

router.get('/users', getUsers);
router.get('/mail', sendMail);

module.exports = router;
