// models/DigitalProduct.js
const mongoose = require('mongoose');

const featureTagSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true, // This ensures that the tag is required
    },
    color: {
        type: String,
        required: true, // This ensures that the color is required
        validate: {
            validator: function(v) {
                // Optional: Validate color format (e.g., hex code)
                return /^#[0-9A-F]{6}$/i.test(v);
            },
            message: props => `${props.value} is not a valid hex color!`
        }
    }
});

const digitalProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    childCategory: { type: String, required: true },
    description: { type: String, required: true },
    buyReturnPolicy: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    youtubeUrl: { type: String },
    tags: [{ type: String }],
    featureTags: [
        {
            tag: { type: String, required: true },
            color: { type: String, required: true }
        }
    ],
    allowProductSEO: { type: Boolean, default: false },
    featureImage: {
        type: String,
        required: true,
    },
    featureImagePublicId: {
        type: String, // For storing the Cloudinary public ID, if applicable
    },
    galleryImages: [{
        imageUrl: {
            type: String,
            required: true, // Each image URL is required
        },
        publicId: {
            type: String, // Optional: for storing Cloudinary public ID
        },
    }],
    uploadType: { 
        type: String, 
        enum: ['file', 'link'], 
        required: true 
    },

}, { timestamps: true });

const Product = mongoose.model('DigitalProduct', digitalProductSchema);
module.exports = Product;
