const express = require('express');
const {
  getPickupLocations,
  createPickupLocation,
  updatePickupLocation,
  deletePickupLocation,
} = require('../controllers/pickupLocationController');

const router = express.Router();

router.get('/', getPickupLocations);
router.post('/', createPickupLocation);
router.put('/:id', updatePickupLocation);
router.delete('/:id', deletePickupLocation);

module.exports = router;
