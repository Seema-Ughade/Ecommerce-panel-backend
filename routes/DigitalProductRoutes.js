const express = require('express');
const { createProduct, updateProductStatus, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/DigitalProductController');
const upload = require('../middlewares/MultiImagemulter'); // Middleware for handling multiple file uploads

const router = express.Router();

// Create a new product (POST)
router.post('/', upload, createProduct);

// Get all products (GET)
router.get('/', getAllProducts);

// Get a single product by ID (GET)
router.get('/:id', getProductById);

// Update product status (PUT)
router.put('/:id/status', updateProductStatus);

// Update an existing product (PUT)
router.put('/:id', updateProduct);

// Delete a product (DELETE)
router.delete('/:id', deleteProduct);

module.exports = router;
