const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const upload = require('../middlewares/multerMiddleware');

// Routes
router.get('/', offerController.getAllOffers);
router.post('/', upload.single('image'), offerController.createOffer);
router.put('/:id', upload.single('image'), offerController.updateOffer);
router.delete('/:id', offerController.deleteOffer);

module.exports = router;
