const express = require('express');
const router = express.Router();
const {
  getAllSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  addAttributeToCategory,
  deleteCategoryAttribute,
  updateCategoryAttribute
} = require('../controllers/subCategoryController');

// Routes
router.get('/', getAllSubCategories);
router.post('/', createSubCategory);
router.put('/:id', updateSubCategory); // For updating a subcategory
router.delete('/:id', deleteSubCategory); // For deleting a subcategory
router.post('/:SubCategoryId/attributes', addAttributeToCategory);

// Route to update an attribute in a category
router.patch('/:subcategoryId/attributes/:attributeId', updateCategoryAttribute);

// Route to delete an attribute from a category
router.delete('/:subcategoryId/attributes/:attributeId', deleteCategoryAttribute);



module.exports = router;
