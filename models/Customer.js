// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    featureImage: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  fax: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Block', 'UnBlock'],
    default: 'Block',
  },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
