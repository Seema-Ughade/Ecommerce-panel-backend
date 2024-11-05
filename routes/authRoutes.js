const express = require('express');
const { login } = require('../controllers/authenticationController');
const router = express.Router();

// Login route
router.post('/login', login);

module.exports = router;
