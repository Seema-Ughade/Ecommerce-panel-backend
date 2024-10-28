const mongoose = require('mongoose');

const pickupLocationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const PickupLocation = mongoose.model('PickupLocation', pickupLocationSchema);
module.exports = PickupLocation;
