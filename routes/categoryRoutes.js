const express = require('express');
const singleUpload = require('../middlewares/ImageMulter'); // Adjust path as necessary
const { createCategory, getAllCategories, updateCategory, deleteCategory, updateCategoryStatus, updateCategoryfeatured, deleteCategoryAttribute, addAttributeToCategory ,updateCategoryAttribute  } = require('../controllers/categoryController');

const router = express.Router();

// Create a new category using memory storage for file upload
router.post('/', singleUpload, createCategory);

router.get('/', getAllCategories);

router.put('/:id', singleUpload, updateCategory);

router.delete('/:id', deleteCategory); 

router.put('/:id/status', updateCategoryStatus);
router.put('/:id/featured', updateCategoryfeatured);


router.post('/:categoryId/attributes', addAttributeToCategory);

router.patch('/:categoryId/attributes/:attributeId', updateCategoryAttribute);

router.delete('/:categoryId/attributes/:attributeId', deleteCategoryAttribute);


module.exports = router;
