// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   image: {
//     type: String,
//   },
//   status: {
//     type: String,
//     default: 'active',
//   },
//   featured: {
//     type: Boolean,
//     default: false,
//   },
// }, {
//   timestamps: true,
// });

// const Category = mongoose.model('Category', categorySchema);
// module.exports = Category;
// models/Category.js
const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  option: { type: String, required: true },
  allowPriceField: { type: Boolean, default: false },
  showOnDetailsPage: { type: Boolean, default: false },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  featured: { type: Boolean, default: false },
  attributes: [attributeSchema],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
