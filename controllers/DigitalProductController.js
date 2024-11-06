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
            uploadType,
            description,
            buyReturnPolicy,
            allowProductSEO,
            price,
            discountPrice,
            youtubeUrl,
            tags,
            featureTags,
        } = req.body;

        // Handle image upload based on the upload type
        let featureImageUrl = '';
        if (uploadType === 'file' && req.files && req.files.featureImage) {
            const featureImageUpload = await cloudinary.uploader.upload(req.files.featureImage.path);
            featureImageUrl = featureImageUpload.secure_url;
        } else if (uploadType === 'link' && req.body.featureImageUrl) {
            featureImageUrl = req.body.featureImageUrl; // The URL entered by the user
        }

        // Handle gallery images upload
        let galleryImages = [];
        if (uploadType === 'file' && req.files && req.files.galleryImages) {
            for (const file of req.files.galleryImages) {
                const upload = await cloudinary.uploader.upload(file.path);
                galleryImages.push(upload.secure_url);
            }
        } else if (uploadType === 'link' && req.body.galleryImageUrls) {
            galleryImages = req.body.galleryImageUrls.split(',').map(url => url.trim()); // Process multiple URLs
        }

        // Create the product
        const newProduct = new DigitalProduct({
            productName,
            category,
            subCategory,
            childCategory,
            uploadType,
            description,
            buyReturnPolicy,
            allowProductSEO,
            price,
            discountPrice,
            youtubeUrl,
            tags: tags.split(',').map(tag => tag.trim()),
            featureTags: featureTags,
            featureImage: featureImageUrl,
            galleryImages: galleryImages
        });

        // Save the product to the database
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Add the other CRUD operations here (getAllProducts, getProductById, updateProduct, deleteProduct, updateProductStatus)
