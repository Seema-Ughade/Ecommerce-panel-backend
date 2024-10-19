// // models/ChildCategory.js
// const mongoose = require('mongoose');

// const childCategorySchema = new mongoose.Schema({
//   category: { type: String, required: true },
//   subCategory: { type: String, required: true },
//   name: { type: String, required: true },
//   slug: { type: String, required: true },
//   attributes: { type: [String], default: [] },
//   status: { type: String, default: 'active' }
// }, { timestamps: true });

// const ChildCategory = mongoose.model('ChildCategory', childCategorySchema);

// module.exports = ChildCategory;
const mongoose = require('mongoose');

// Define a schema for the attribute
const attributeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  option: { type: String, required: true },
  allowPriceField: { type: Boolean, default: false },
  showOnDetailsPage: { type: Boolean, default: false },
});

// Define the main ChildCategory schema
const childCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  attributes: { type: [attributeSchema], default: [] }, // Update this to accept an array of objects
  status: { type: String, default: 'active' }
}, { timestamps: true });

const ChildCategory = mongoose.model('ChildCategory', childCategorySchema);

module.exports = ChildCategory;
