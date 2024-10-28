// routes/sliderRoutes.js
const express = require('express');
const router = express.Router();
const singleUpload = require('../middlewares/imageMulter'); // Adjust path as necessary

const { createSlider, updateSlider, deleteSlider, getAllSliders } = require('../controllers/sliderController');

// Set up multer for file uploads

router.post('/', singleUpload, createSlider);
router.put('/:id', singleUpload, updateSlider);
router.get('/', getAllSliders);
router.delete('/:id', deleteSlider); // DELETE route for sliders

module.exports = router;
