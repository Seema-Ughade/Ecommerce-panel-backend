const mongoose = require('mongoose');

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
  }
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;
