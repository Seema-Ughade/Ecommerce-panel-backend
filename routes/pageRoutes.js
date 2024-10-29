// routes/pageRoutes.js
const express = require('express');
const { createPage, updateHeaderChange, updateFooterChange,  getPages, updatePage, deletePage } = require('../controllers/pageController');
const singleUpload = require('../middlewares/ImageMulter'); // Adjust path as necessary
const router = express.Router();


// Routes for pages
router.post('/',singleUpload, createPage);
router.get('/', getPages);
router.put('/:id/Header', updateHeaderChange); // Update header
router.put('/:id/Footer', updateFooterChange); // Update footer

router.put('/:id',singleUpload, updatePage);
router.delete('/:id', deletePage);

module.exports = router;
