const Product = require('../models/affiliateProduct');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require('../utils/dataUri');

exports.createProduct = async (req, res) => {
    try {
        const productData = req.body;
        
        if (req.files) {
            if (req.files.featureImage) {
                const file = getDataUri(req.files.featureImage[0]);
                const result = await cloudinary.uploader.upload(file.content);
                productData.featureImage = result.secure_url;
            }
            if (req.files.galleryImages) {
                const uploadPromises = req.files.galleryImages.map(file => {
                    const fileUri = getDataUri(file);
                    return cloudinary.uploader.upload(fileUri.content);
                });
                const results = await Promise.all(uploadPromises);
                productData.galleryImages = results.map(result => result.secure_url);
            }
        }

        const product = new Product(productData);
        await product.save();
        
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productData = req.body;

        if (req.files) {
            if (req.files.featureImage) {
                const file = getDataUri(req.files.featureImage[0]);
                const result = await cloudinary.uploader.upload(file.content);
                productData.featureImage = result.secure_url;
            }
            if (req.files.galleryImages) {
                const uploadPromises = req.files.galleryImages.map(file => {
                    const fileUri = getDataUri(file);
                    return cloudinary.uploader.upload(fileUri.content);
                });
                const results = await Promise.all(uploadPromises);
                productData.galleryImages = results.map(result => result.secure_url);
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

