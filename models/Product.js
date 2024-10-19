const mongoose = require('mongoose');

const FeatureTagSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  color: { type: String, required: true },
});

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  childCategory: { type: String, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  buyReturnPolicy: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  youtubeUrl: { type: String },
  tags: { type: String },
  featureTags: [FeatureTagSchema],
  featureImage: { type: String, required: true },
  galleryImages: [String],
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
