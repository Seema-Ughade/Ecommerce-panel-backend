// models/currencyModel.js

const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sign: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Currency', currencySchema);
