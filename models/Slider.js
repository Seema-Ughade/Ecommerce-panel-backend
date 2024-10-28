// models/Slider.js
const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;
