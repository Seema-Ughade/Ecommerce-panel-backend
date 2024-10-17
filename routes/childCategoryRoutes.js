// routes/childCategoryRoutes.js
const express = require('express');
const router = express.Router();
const childCategoryController = require('../controllers/childCategoryController');

// Routes for child categories
router.get('/', childCategoryController.getAllChildCategories);
router.post('/', childCategoryController.createChildCategory);
router.delete('/:id', childCategoryController.deleteChildCategory);

module.exports = router;
