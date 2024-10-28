// routes/serviceRoutes.js
const express = require('express');
const serviceController = require('../controllers/serviceController');

const router = express.Router();
const singleUpload = require('../middlewares/imageMulter'); // Adjust path as necessary

router.get('/', serviceController.getAllServices);
router.post('/', singleUpload, serviceController.createService);
router.put('/:id', singleUpload, serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
