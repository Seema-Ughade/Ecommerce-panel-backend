const express = require('express');
// const singleUpload = require('../middlewares/multer'); // Adjust path as necessary
const upload = require('../middlewares/MultiImagemulter')
const { createProduct, updateProductStatus, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

// Create a new product
router.post('/', upload, createProduct);
router.get('/', getAllProducts);

// Get a single product by ID
router.get('/:id', getProductById);
router.put('/:id/status', updateProductStatus);

// Update an existing product
router.put('/:id', upload, updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;
