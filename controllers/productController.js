const Product = require('../models/Product');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require("../utils/dataUri");

exports.createProduct = async (req, res) => {
    try {
        const productData = req.body;
        console.log('Incoming Product Data:', productData);
        console.log('Feature Image:', req.file);
        console.log('Gallery Images:', req.files);

        // Upload feature image to Cloudinary if provided
        if (req.file) {
            const fileUri = getDataUri(req.file).content;
            const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
            productData.featureImage = result.secure_url;
        }

        // Upload gallery images to Cloudinary if provided
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => {
                const fileUri = getDataUri(file).content;
                return cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
            });
            const results = await Promise.all(uploadPromises);
            productData.galleryImages = results.map(result => result.secure_url);
        }

        const product = new Product(productData);
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ message: 'Error creating product', error });
    }
};
exports.getAllProducts = async (req, res) => {
  try {
      const products = await Product.find();
      res.status(200).json(products);
  } catch (error) {
      console.error('Error fetching products:', error.message);
      res.status(500).json({ message: 'Error fetching products', error });
  }
};
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
exports.updateProduct = async (req, res) => {
  try {
      const { id } = req.params;
      const productData = req.body;

      // Find product by ID
      const product = await Product.findById(id);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Handle image uploads similar to createProduct if needed
      if (req.file) {
          const fileUri = getDataUri(req.file).content;
          const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
          productData.featureImage = result.secure_url; // Update feature image if provided
      }

      // Update gallery images if provided
      if (req.files && req.files.length > 0) {
          const uploadPromises = req.files.map(file => {
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
exports.updateProductStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
