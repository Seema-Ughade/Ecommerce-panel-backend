// models/Font.js
const mongoose = require('mongoose');

const FontSchema = new mongoose.Schema({
  family: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Font = mongoose.model('Font', FontSchema);

module.exports = Font;
