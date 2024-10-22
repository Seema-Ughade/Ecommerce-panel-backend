// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    sku: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    childCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ChildCategory', required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    buyReturnPolicy: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    youtubeUrl: { type: String },
    tags: [{ type: String }],
    featureImage: { type: String, required: true },
    galleryImages: [{ type: String }],
    featureTags: [{ tag: String, color: String }],
    allowProductSEO: { type: Boolean, default: false },
    allowProductCondition: { type: Boolean, default: false },
    allowProductPreorder: { type: Boolean, default: false },
    manageStock: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('DigitalProduct', ProductSchema);
