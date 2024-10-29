// models/Page.js
const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  seo: { type: Boolean, default: false },
  image: { type: String },
  Header: { type: String, enum: ['Showed', 'Not Showed'], default: 'Showed' },
  Footer:  { type: String, enum: ['Showed', 'Not Showed'], default: 'Showed' },

}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
