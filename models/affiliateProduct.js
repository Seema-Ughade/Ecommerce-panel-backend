const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    childCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ChildCategory', required: true },
    description: { type: String, required: true },
    buyReturnPolicy: { type: String, required: true },
    allowProductSEO: { type: Boolean, default: false },
    metaTags: { type: String },
    metaDescription: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    youtubeUrl: { type: String },
    allowProductCondition: { type: Boolean, default: false },
    productCondition: { type: String },
    allowProductMeasurement: { type: Boolean, default: false },
    productMeasurement: { type: String },
    allowProductColors: { type: Boolean, default: false },
    colors: [{ type: String }],
    allowProductSizes: { type: Boolean, default: false },
    productSizes: { type: String },
    allowEstimatedShippingTime: { type: Boolean, default: false },
    estimatedShippingTime: { type: String },
    featureImageSource: { type: String },
    featureImageLink: { type: String },
    featureImage: { type: String }, // This will now store the Cloudinary URL
    galleryImages: [{ type: String }], // This will now store an array of Cloudinary URLs
    featureTags: [{ 
        tag: { type: String },
        color: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('AffiliateProduct', productSchema);

