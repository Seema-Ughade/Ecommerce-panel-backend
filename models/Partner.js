const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Partner', PartnerSchema);
