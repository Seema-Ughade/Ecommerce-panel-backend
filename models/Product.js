const mongoose = require('mongoose');

const featureTagSchema = new mongoose.Schema({
    tag: { type: String, required: true },
    color: { type: String, required: true },
}, { _id: false });

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    childCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ChildCategory', required: true },
    allowProductCondition: { type: Boolean, default: false },
    allowProductPreorder: { type: Boolean, default: false },
    allowMinimumOrderQty: { type: Boolean, default: false },
    manageStock: { type: Boolean, default: false },
    allowEstimatedShippingTime: { type: Boolean, default: false },
    allowProductWholeSell: { type: Boolean, default: false },
    allowProductMeasurement: { type: Boolean, default: false },
    allowProductColors: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
    description: { type: String, required: true },
    buyReturnPolicy: { type: String, required: true },
    allowProductSEO: { type: Boolean, default: false },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    youtubeUrl: { type: String },
    featureTags: [
        {
            tag: { type: String, required: true },
            color: { type: String, required: true }
        }
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'], // Example statuses
      default: 'active',
    },
    tags: [{ type: String }],
    featureImageUrl: { type: String, required: true },
    galleryImagesUrls: [String], // An array of image URLs for the gallery images
  
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
