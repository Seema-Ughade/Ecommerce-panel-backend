const express = require('express');
const upload = require('../middlewares/multerMiddleware'); // Ensure this is correctly set up
const {
    createProduct,
    updateProductStatus,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// Create a new product
router.post('/', 
    upload.fields([{ name: 'featureImage', maxCount: 1 }, { name: 'galleryImages', maxCount: 10 }]), 
    createProduct
);

// Get all products
router.get('/', getAllProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Update the status of a product
router.put('/:id/status', updateProductStatus);

// Update an existing product
router.put('/:id',
    upload.fields([{ name: 'featureImage', maxCount: 1 }, { name: 'galleryImages', maxCount: 10 }]), 
    updateProduct
);

// Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;
