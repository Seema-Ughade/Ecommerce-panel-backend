const express = require('express');
const router = express.Router();
const dealController = require('../controllers/dealController');
const upload = require('../middlewares/multerMiddleware');

// Routes
router.post('/', upload.single('image'), dealController.createDeal);
router.put('/:id', upload.single('image'), dealController.updateDeal);
router.delete('/:id', dealController.deleteDeal);
router.get('/', dealController.getAllDeals);

module.exports = router;
