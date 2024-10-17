// models/ChildCategory.js
const mongoose = require('mongoose');

const childCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  attributes: { type: [String], default: [] },
  status: { type: String, default: 'active' }
}, { timestamps: true });

const ChildCategory = mongoose.model('ChildCategory', childCategorySchema);

module.exports = ChildCategory;
