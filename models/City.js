// models/City.js
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },

});

module.exports = mongoose.model('City', citySchema);
