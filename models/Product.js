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
    // allowProductCondition: { type: Boolean, default: false },
    // allowProductPreorder: { type: Boolean, default: false },
    // allowMinimumOrderQty: { type: Boolean, default: false },
    // manageStock: { type: Boolean, default: false },
    // allowEstimatedShippingTime: { type: Boolean, default: false },
    // allowProductWholeSell: { type: Boolean, default: false },
    // allowProductMeasurement: { type: Boolean, default: false },
    // allowProductColors: { type: Boolean, default: false },
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
    allowProductCondition: Boolean,
    productCondition: {
        type: String,
        enum: ["new", "used"],
        default: ""
    },
    allowProductPreorder: Boolean,
    productPreorder: {
        type: String,
        enum: ["sale", "preordered"],
        default: ""
    },
    allowMinimumOrderQty: Boolean,
    minimumOrderQty: {
        type: Number,
        min: 0,
        default: 0
    },
    manageStock: Boolean,
    stockQuantity: {
        type: Number,
        min: 0,
        default: 0
    },
    allowEstimatedShippingTime: Boolean,
    estimatedShippingTime: {
        type: String,
        default: ""
    },
    allowProductWholeSell: Boolean,
    wholeSellEntries: [
        {
            quantity: {
                type: Number,
                min: 0,
                default: 0
            },
            discount: {
                type: Number,
                min: 0,
                max: 100,
                default: 0
            }
        }
    ],
    allowProductMeasurement: Boolean,
    productMeasurement: {
        type: String,
        enum: ["Gram", "Kilogram", "Litre", "Pound", "Custom"],
        default: ""
    },
    allowProductColors: Boolean,
    colors: {
        type: [String], // Array of color strings
        default: []
    },
    stock: {
        type: Number,
        min: 0,
        default: 0
    },
    tags: [{ type: String }],
    featureImageUrl: { type: String, required: true },
    galleryImagesUrls: [String], // An array of image URLs for the gallery images
},
{ timestamps: true });

module.exports = mongoose.model('Product', productSchema);
