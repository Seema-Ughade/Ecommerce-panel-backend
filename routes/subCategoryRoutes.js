const express = require('express');
const router = express.Router();
const {
  getAllSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require('../controllers/subCategoryController');

// Routes
router.get('/', getAllSubCategories);
router.post('/', createSubCategory);
router.put('/:id', updateSubCategory); // For updating a subcategory
router.delete('/:id', deleteSubCategory); // For deleting a subcategory

module.exports = router;
