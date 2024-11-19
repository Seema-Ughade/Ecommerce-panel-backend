// controllers/productController.js
const DigitalProduct = require('../models/DigitalProduct');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require("../utils/dataUri");


// Create Product
exports.createDigitalProduct = async (req, res) => {
    try {
        const {
            productName,
            category,
            subCategory,
            childCategory,
            imageUploadMethod,  // Main upload method (file or link)
            description,
            buyReturnPolicy,
            allowProductSEO,
            price,
            discountPrice,
            youtubeUrl,
            tags,
            featureTags,
            featureImageUrl,  // URL for feature image if 'link' upload method is selected
            galleryImageUrls,  // URLs for gallery images if 'link' upload method is selected
        } = req.body;

        // Handle feature image upload based on the selected method
        let featureImageUrlFinal = '';
        if (imageUploadMethod === 'file' && req.files && req.files.featureImage) {
            // Upload feature image file
            const featureImageUpload = await cloudinary.uploader.upload(req.files.featureImage.path);
            featureImageUrlFinal = featureImageUpload.secure_url;
        } else if (imageUploadMethod === 'link' && featureImageUrl) {
            // Use the URL for feature image if the upload method is 'link'
            featureImageUrlFinal = featureImageUrl;
        }

        // Handle gallery images upload based on the selected method
        let galleryImages = [];
        if (imageUploadMethod === 'file' && req.files && req.files.galleryImages) {
            // Upload multiple gallery images if method is 'file'
            for (const file of req.files.galleryImages) {
                const upload = await cloudinary.uploader.upload(file.path);
                galleryImages.push(upload.secure_url);
            }
        } else if (imageUploadMethod === 'link' && galleryImageUrls) {
            // Use gallery image URLs if the upload method is 'link'
            galleryImages = galleryImageUrls.split(',').map(url => url.trim());
        }

        // Handle tags input (convert string to array)
        const tagList = tags ? tags.split(',').map(tag => tag.trim()) : [];

        // Create a new DigitalProduct object
        const newProduct = new DigitalProduct({
            productName,
            category,
            subCategory,
            childCategory,
            imageUploadMethod,
            description,
            buyReturnPolicy,
            allowProductSEO,
            price,
            discountPrice,
            youtubeUrl,
            tags: tagList,
            featureTags,
            featureImage: featureImageUrlFinal,
            galleryImages: galleryImages
        });

        // Save the new product to the database
        await newProduct.save();

        // Send a success response with the created product details
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Add the other CRUD operations here (getAllProducts, getProductById, updateProduct, deleteProduct, updateProductStatus)
