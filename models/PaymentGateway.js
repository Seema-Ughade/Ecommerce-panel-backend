const mongoose = require('mongoose');

const PaymentGatewaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Checkout: { type: String, enum: ['Showed', 'Not Showed'], default: 'Showed' },
  Deposit: { type: String, enum: ['Showed', 'Not Showed'], default: 'Showed' },
  Subscription:{ type: String, enum: ['Showed', 'Not Showed'], default: 'Showed' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PaymentGateway', PaymentGatewaySchema);
