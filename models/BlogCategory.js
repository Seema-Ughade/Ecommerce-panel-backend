// models/Category.js
const mongoose = require('mongoose');

const BlogcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

const Blogcategory = mongoose.model('BlogCategory', BlogcategorySchema);
module.exports = Blogcategory;
