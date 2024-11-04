// models/couponModel.js
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  productType: {
    type: String,
    enum: ['categories', 'subcategories', 'childcategories'],
    required: true,
  },
  type: {
    type: String,
    enum: ['0', '1'], // 0 = Percentage, 1 = Amount
    required: true,
  },
  quantityType: {
    type: String,
    enum: ['limited', 'unlimited'],
    default: 'unlimited',
  },
  quantity: {
    type: Number,
    default: null,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  used: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
