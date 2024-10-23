// controllers/productController.js
const Product = require('../models/DigitalProduct');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require("../utils/dataUri");

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const {
            productName,  category, subCategory, childCategory,
            description, buyReturnPolicy, price, discountPrice,
            youtubeUrl, tags, featureTags, allowProductSEO,
            allowProductCondition, allowProductPreorder, manageStock
        } = req.body;

        // Handle feature image upload
        let featureImage = null;
        if (req.files?.featureImage) {
            const fileUri = getDataUri(req.files.featureImage[0]).content;
            const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
            featureImage = result.secure_url;
        }

        // Handle gallery images upload
        let galleryImages = [];
        if (req.files?.galleryImages) {
            const uploadPromises = req.files.galleryImages.map(file => {
                const fileUri = getDataUri(file).content;
                return cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
            });
            const results = await Promise.all(uploadPromises);
            galleryImages = results.map(result => result.secure_url);
        }

        // Initialize tags as an array if not provided
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

        // Create new product
        const newProduct = new Product({
            productName,
            category,
            subCategory,
            childCategory,
            description,
            buyReturnPolicy,
            price,
            discountPrice,
            youtubeUrl,
            tags: tagsArray,
            featureTags,
            allowProductSEO,
            allowProductCondition,
            allowProductPreorder,
            manageStock,
            featureImage,
            galleryImages
        });

        // Save the product to the database
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Add the other CRUD operations here (getAllProducts, getProductById, updateProduct, deleteProduct, updateProductStatus)
