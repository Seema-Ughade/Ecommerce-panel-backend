const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder } = require('../controllers/Uiordercontroller');

router.post('/', createOrder);
// Route to get all orders
router.get('/', getAllOrders);

// Route to get an order by ID
router.get('/:id', getOrderById);

// Route to update an order
router.put('/:id', updateOrder);

// Route to delete an order
router.delete('/:id', deleteOrder);

module.exports = router;