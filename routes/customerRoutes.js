// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const singleUpload = require('../middlewares/multer'); // Adjust path as necessary

// Get all customers
router.get('/', customerController.getAllCustomers);

// Add a new customer
router.post('/', singleUpload, customerController.createCustomer);

// Delete a customer
router.delete('/:id', customerController.deleteCustomer);

// Update customer status (active/inactive)
router.put('/:id/status', customerController.updateCustomerStatus);

module.exports = router;
