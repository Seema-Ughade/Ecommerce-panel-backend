const express = require('express');
const router = express.Router();
const riderController = require('../controllers/riderController');

router.post('/register', riderController.register);
router.post('/login', riderController.login);

module.exports = router;

