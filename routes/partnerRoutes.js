const express = require('express');
const partnerController = require('../controllers/partnerController');

const router = express.Router();
const singleUpload = require('../middlewares/imageMulter'); // Adjust path as necessary

// Define routes
router.get('/', partnerController.getAllPartners);
router.post('/', singleUpload, partnerController.createPartner);
router.put('/:id', singleUpload, partnerController.updatePartner);
router.delete('/:id', partnerController.deletePartner);

module.exports = router;
