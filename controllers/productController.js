const Product = require('../models/Product');
const cloudinary = require('../middlewares/cloudinaryConfig'); // Cloudinary configuration
const getDataUri = require("../utils/dataUri"); // Utility to convert to Data URI

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Upload feature image to Cloudinary if provided
    if (req.file) {
      const fileUri = getDataUri(req.file).content;
      const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
      productData.featureImage = result.secure_url; // Set the secure URL for the feature image
    }

    // Upload gallery images to Cloudinary if provided
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => {
        const fileUri = getDataUri(file).content;
        return cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
      });
      const results = await Promise.all(uploadPromises);
      productData.galleryImages = results.map(result => result.secure_url); // Set secure URLs for gallery images
    }

    // Create a new product instance
    const product = new Product(productData);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: 'Error creating product', error });
  }
};
