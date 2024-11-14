const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
});

module.exports = mongoose.model('All Order', orderSchema);
