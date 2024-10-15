// const express = require('express');
// const singleUpload = require('../middlewares/multer'); // Adjust path as necessary
// const { createCategory, getAllCategories } = require('../controllers/categoryController');

// const router = express.Router();

// // Create a new category using memory storage for file upload
// router.post('/', singleUpload, createCategory);

// // Get all categories
// router.get('/', getAllCategories);

// module.exports = router;
const express = require('express');
const singleUpload = require('../middlewares/multer'); // Adjust path as necessary
const { createCategory, getAllCategories, updateCategoryStatus, deleteCategoryAttribute, addAttributeToCategory ,updateCategoryAttribute  } = require('../controllers/categoryController');

const router = express.Router();

// Create a new category using memory storage for file upload
router.post('/', singleUpload, createCategory);

// Get all categories
router.get('/', getAllCategories);
router.put('/:id', updateCategoryStatus);

// Add attribute to category
router.post('/:categoryId/attributes', addAttributeToCategory);

// Route to update an attribute in a category
router.patch('/:categoryId/attributes/:attributeId', updateCategoryAttribute);

// Route to delete an attribute from a category
router.delete('/:categoryId/attributes/:attributeId', deleteCategoryAttribute);


module.exports = router;
