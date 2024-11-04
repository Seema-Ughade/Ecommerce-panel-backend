// routes/currencyRoutes.js

const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

// Route to get all currencies
router.get('/', currencyController.getCurrencies);

// Route to add a new currency
router.post('/', currencyController.addCurrency);

// Route to delete a currency by ID
router.delete('/:id', currencyController.deleteCurrency);

router.put('/:id', currencyController.updateCurrency);


module.exports = router;
