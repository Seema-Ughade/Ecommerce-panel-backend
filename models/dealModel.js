const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    dateLimit: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Deal', dealSchema);
