const express = require('express');
const {
  getShippingMethods,
  createShippingMethod,
  updateShippingMethod,
  deleteShippingMethod,
} = require('../controllers/shippingMethodsController');

const router = express.Router();

router.get('/', getShippingMethods);
router.post('/', createShippingMethod);
router.put('/:id', updateShippingMethod);
router.delete('/:id', deleteShippingMethod);

module.exports = router;
