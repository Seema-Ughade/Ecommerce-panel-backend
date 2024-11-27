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
    featureImageUrl: { type: String, required: true },
    galleryImagesUrls: [String], // An array of image URLs for the gallery images
    imagePath: {
        type: String,
        required: true,
      },
      uploadType: {
        type: String,
        enum: ["file", "link"],
        required: true,
      },
      imageURL: {
        type: String,
        default: "",
      },
  
}, { timestamps: true });

const Product = mongoose.model('DigitalProduct', digitalProductSchema);
module.exports = Product;
