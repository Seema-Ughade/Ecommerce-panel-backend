// routes/categoryRoutes.js
const express = require('express');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/BlogcategoryController');

const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:slug', updateCategory);
router.delete('/:id', deleteCategory);


module.exports = router;
