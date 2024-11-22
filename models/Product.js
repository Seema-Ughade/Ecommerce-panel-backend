const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
    },
    sku: {
        type: String,
        required: true,
        unique: true, // Ensures each SKU is unique
        trim: true,
        maxlength: 50, // Adjust the maximum length as needed
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // References the Category model
        required: true, // Ensures category selection is mandatory
    },
    subCategory: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'SubCategory',
           required: true
    },
    childCategory: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'ChildCategory',
           required: true
    },

    allowProductCondition: {
        type: Boolean,
        default: false, // Default to false if not checked
    },
    productCondition: {
        type: String,
        enum: ['new', 'used'], // Restrict to 'new' or 'used'
        required: function () { return this.allowProductCondition; }, // Required only if allowProductCondition is true
    },

    allowProductPreorder: {
        type: Boolean,
        default: false, // Default to false if the checkbox is not checked
    },
    productPreorder: {
        type: String,
        enum: ['sale', 'preordered'], // Restrict to 'sale' or 'preordered'
        required: function () { return this.allowProductPreorder; }, // Required only if allowProductPreorder is true
    },
    allowMinimumOrderQty: {
        type: Boolean,
        default: false, // Default to false if checkbox is not checked
    },
    minimumOrderQty: {
        type: Number,
        min: 1, // Ensures the minimum order quantity is at least 1
        required: function () { return this.allowMinimumOrderQty; }, // Required only if allowMinimumOrderQty is true
    },
    manageStock: {
        type: Boolean,
        default: false, // Defaults to false if stock management is not enabled
    },
    stockQuantity: {
        type: Number,
        min: 0, // Ensures stock quantity is non-negative
        required: function () { return this.manageStock; }, // Required only if manageStock is true
        default: null, // Allows for null value to represent "always available" if not managing stock
    },
    allowEstimatedShippingTime: {
        type: Boolean,
        default: false, // Defaults to false if estimated shipping time is not enabled
    },
    estimatedShippingTime: {
        type: String,
        required: function () { return this.allowEstimatedShippingTime; }, // Required only if allowEstimatedShippingTime is true
        trim: true,
    },
    allowProductWholeSell: {
        type: Boolean,
        default: false, // Determines if wholesale options are enabled
    },
    wholeSellEntries: [
        {
            quantity: {
                type: Number,
                required: function () { return this.allowProductWholeSell; }, // Required only if allowProductWholeSell is true
                min: 1, // Optional: specify minimum quantity
            },
            discount: {
                type: Number,
                required: function () { return this.allowProductWholeSell; }, // Required only if allowProductWholeSell is true
                min: 0,  // Minimum discount (0%) - can be adjusted
                max: 100 // Maximum discount (100%)
            }
        }
    ],
    allowProductMeasurement: {
        type: Boolean,
        default: false, // Determines if product measurement is allowed
    },
    productMeasurement: {
        type: String,
        enum: ['Gram', 'Kilogram', 'Litre', 'Pound', 'Custom', 'None'],
        required: function () { return this.allowProductMeasurement; }, // Required only if allowProductMeasurement is true
        default: 'None', // Default value when measurement is not allowed
    },
    allowProductColors: {
        type: Boolean,
        default: false, // Indicates if product colors are allowed
    },
    colors: {
        type: [String], // Array of strings to store multiple colors
        required: function () { return this.allowProductColors; }, // Required if allowProductColors is true
        default: [], // Default to an empty array if not allowed
    },
    stock: {
        type: Number,
        required: false, // Not required, as leaving it empty means 'always available'
        default: null,   // Default value is null, indicating always available
        min: 0           // Minimum stock value should be 0
    },
    description: {
        type: String,
        required: true,  // Required field for product description
        trim: true,      // Trim whitespace from the beginning and end
        minlength: 10,   // Minimum length of 10 characters
        maxlength: 2000  // Maximum length of 2000 characters
    },
    buyReturnPolicy: {
        type: String,
        required: true,  // Required field for buy/return policy
        trim: true,      // Trim whitespace from the beginning and end
        minlength: 10,   // Minimum length of 10 characters
        maxlength: 2000  // Maximum length of 2000 characters
    },
    allowProductSEO: {
        type: Boolean,
        default: false
    },
    metaTitle: {
        type: String,
        trim: true,
        maxlength: 60 // Typical max length for SEO title
    },
    metaDescription: {
        type: String,
        trim: true,
        maxlength: 160 // Typical max length for SEO description
    },
    keywords: {
        type: [String], // Array of keywords
        default: []
    },
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
    price: {
        type: Number,
        required: true, // The price is required
        min: 0, // The price should be a non-negative number
    },
    discountPrice: {
        type: Number,
        required: false, // The discount price is optional
        min: 0, // The discount price should be a non-negative number
    },
    youtubeUrl: {
        type: String,
        required: false, // The YouTube URL is optional
        validate: {
            validator: function(v) {
                // Simple regex to validate a YouTube URL
                return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(v);
            },
            message: props => `${props.value} is not a valid YouTube URL!`
        }
    },

    tags: {
        type: [String], // Array of strings
        required: true, // Assuming tags are required
        validate: {
            validator: function(v) {
                // Validate that each tag is a non-empty string
                return v.every(tag => typeof tag === 'string' && tag.trim().length > 0);
            },
            message: 'Tags must be non-empty strings!'
        }
    },

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
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
















