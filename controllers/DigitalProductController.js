const Product = require('../models/DigitalProduct');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require("../utils/dataUri");

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const {
            productName, sku, category, subCategory, childCategory, stock, description,
            buyReturnPolicy, price, discountPrice, youtubeUrl, tags, featureTags, 
            allowProductSEO, allowProductCondition, allowProductPreorder, manageStock
        } = req.body;

        // Handle feature image upload
        let featureImage = null;
        if (req.files?.featureImage) {
            try {
                const fileUri = getDataUri(req.files.featureImage[0]).content;
                const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
                featureImage = result.secure_url;
            } catch (error) {
                console.error("Error uploading feature image:", error);
                return res.status(500).json({ message: 'Error uploading feature image', error: error.message });
            }
        }

        // Handle gallery images upload
        let galleryImages = [];
        if (req.files?.galleryImages && req.files.galleryImages.length > 0) {
            try {
                const uploadPromises = req.files.galleryImages.map(file => {
                    const fileUri = getDataUri(file).content;
                    return cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
                });
                const results = await Promise.all(uploadPromises);
                galleryImages = results.map(result => result.secure_url);
            } catch (error) {
                console.error("Error uploading gallery images:", error);
                return res.status(500).json({ message: 'Error uploading gallery images', error: error.message });
            }
        }

        // Initialize tags as an array if not provided
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

        // Create new product
        const newProduct = new Product({
            productName,
            sku,
            category,
            subCategory,
            childCategory,
            stock,
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

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = req.body;

        // Find product by ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Handle image uploads if necessary
        if (req.files?.featureImage) {
            const fileUri = getDataUri(req.files.featureImage[0]).content;
            const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
            productData.featureImage = result.secure_url; // Update feature image if provided
        }

        // Update gallery images if necessary
        if (req.files?.galleryImages && req.files.galleryImages.length > 0) {
            const uploadPromises = req.files.galleryImages.map(file => {
                const fileUri = getDataUri(file).content;
                return cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
            });
            const results = await Promise.all(uploadPromises);
            productData.galleryImages = results.map(result => result.secure_url); // Update gallery images
        }

        // Update product data
        Object.assign(product, productData);
        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.remove();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

// Update Product Status
exports.updateProductStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product status updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product status:', error.message);
        res.status(500).json({ message: 'Error updating product status', error });
    }
};
