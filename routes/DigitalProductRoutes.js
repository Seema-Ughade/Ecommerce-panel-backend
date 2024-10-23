// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/DigitalProductController');
const upload = require('../middlewares/MultiImagemulter'); // Assuming this is your multer setup

// Create product
router.post('/', upload, productController.createProduct);

// Other routes can be added here (GET, PUT, DELETE, etc.)

module.exports = router;
