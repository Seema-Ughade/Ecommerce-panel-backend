// routes/childCategoryRoutes.js
const express = require('express');
const router = express.Router();
const childCategoryController = require('../controllers/childCategoryController');
const { getAllChildCategories, updateCategoryStatus, createChildCategory, deleteChildCategory ,addAttributeToChildCategory ,updateCategoryAttribute,deleteCategoryAttribute  } = require('../controllers/childCategoryController');

// Routes for child categories
router.get('/', getAllChildCategories);
router.post('/', createChildCategory);
router.delete('/:id', deleteChildCategory);
router.post('/:childCategoryId/attributes', addAttributeToChildCategory);

router.put('/:id/status', updateCategoryStatus);

router.patch('/:childCategoryId/attributes/:attributeId', updateCategoryAttribute);

// Route to delete an attribute from a category
router.delete('/:childCategoryId/attributes/:attributeId', deleteCategoryAttribute);


module.exports = router;
