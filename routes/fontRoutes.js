// routes/fontRoutes.js
const express = require('express');
const router = express.Router();
const fontController = require('../controllers/fontController');

// Define routes for fonts
router.get('/', fontController.getFonts);
router.post('/', fontController.createFont);
router.put('/:id', fontController.updateFont);
router.delete('/:id', fontController.deleteFont);

module.exports = router;
