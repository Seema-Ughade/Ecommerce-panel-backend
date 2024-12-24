const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Offer', offerSchema);
