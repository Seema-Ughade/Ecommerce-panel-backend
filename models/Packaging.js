// models/Packaging.js
const mongoose = require('mongoose');

const PackagingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });

const Packaging = mongoose.model('Packaging', PackagingSchema);

module.exports = Packaging;
