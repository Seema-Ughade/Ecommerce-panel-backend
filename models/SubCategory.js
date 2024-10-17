const mongoose = require('mongoose');
const attributeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  option: { type: String, required: true },
  allowPriceField: { type: Boolean, default: false },
  showOnDetailsPage: { type: Boolean, default: false },
});


const subCategorySchema = new mongoose.Schema({
  mainCategory: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },

  attributes: [attributeSchema],

});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;


