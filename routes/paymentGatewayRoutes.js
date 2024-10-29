const express = require('express');
const router = express.Router();
const paymentGatewayController = require('../controllers/paymentGatewayController');

// Routes for payment gateways
router.post('/', paymentGatewayController.createPaymentGateway);
router.get('/', paymentGatewayController.getPaymentGateways);
router.put('/:id', paymentGatewayController.updatePaymentGateway);
router.delete('/:id', paymentGatewayController.deletePaymentGateway);
router.put('/:id/Checkout', paymentGatewayController.updateCheckout);
router.put('/:id/Deposit', paymentGatewayController.updateDeposit);
router.put('/:id/Subscription', paymentGatewayController.updateSubscription);

module.exports = router;
