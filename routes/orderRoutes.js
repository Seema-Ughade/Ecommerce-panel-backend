const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllProducts);
router.post('/', orderController.createProduct);

module.exports = router;
