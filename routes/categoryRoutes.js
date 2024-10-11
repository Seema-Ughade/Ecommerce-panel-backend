const express = require('express');
const singleUpload = require('../middlewares/multer'); // Adjust path as necessary
const { createCategory, getAllCategories } = require('../controllers/categoryController');

const router = express.Router();

// Create a new category using memory storage for file upload
router.post('/', singleUpload, createCategory);

// Get all categories
router.get('/', getAllCategories);

module.exports = router;
