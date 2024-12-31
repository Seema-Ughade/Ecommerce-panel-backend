const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tax: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
});

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  tax: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  allowStateTax: {
    type: Boolean,
    default: false
  },
  states: [StateSchema]
});

module.exports = mongoose.model('Country', CountrySchema);

