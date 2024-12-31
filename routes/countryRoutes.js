const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

router.get('/', countryController.getAllCountries);
router.get('/:id', countryController.getCountry);
router.post('/', countryController.createCountry);
router.put('/:id', countryController.updateCountry);
router.delete('/:id', countryController.deleteCountry);

module.exports = router;

