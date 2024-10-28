// models/Faq.js
const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Faq', FaqSchema);
