const PaymentGateway = require('../models/PaymentGateway');

// Create a new payment gateway
exports.createPaymentGateway = async (req, res) => {
  try {
    const paymentGateway = new PaymentGateway(req.body);
    const savedGateway = await paymentGateway.save();
    res.status(201).json(savedGateway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all payment gateways
exports.getPaymentGateways = async (req, res) => {
  try {
    const gateways = await PaymentGateway.find();
    res.status(200).json(gateways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a payment gateway
exports.updatePaymentGateway = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGateway = await PaymentGateway.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedGateway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a payment gateway
exports.deletePaymentGateway = async (req, res) => {
  try {
    const { id } = req.params;
    await PaymentGateway.findByIdAndDelete(id);
    res.status(204).json({ message: 'Payment gateway deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCheckout = async (req, res) => {
    const { Checkout } = req.body;
    try {
      const updatedGateway = await PaymentGateway.findByIdAndUpdate(req.params.id, { Checkout }, { new: true });
      res.json(updatedGateway);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  






exports.updateDeposit = async (req, res) => {
    const { id } = req.params;
    const { Deposit } = req.body;

    try {
        const updatedGateway = await PaymentGateway.findByIdAndUpdate(id, { Deposit }, { new: true });
        res.json(updatedGateway);
    } catch (error) {
        res.status(400).json({ message: 'Error updating Deposit' });
    }
};

exports.updateSubscription = async (req, res) => {
    const { id } = req.params;
    const { Subscription } = req.body;

    try {
        const updatedGateway = await PaymentGateway.findByIdAndUpdate(id, { Subscription }, { new: true });
        res.json(updatedGateway);
    } catch (error) {
        res.status(400).json({ message: 'Error updating Subscription' });
    }
};
