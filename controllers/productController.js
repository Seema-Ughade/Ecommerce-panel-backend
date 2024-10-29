const Product = require('../models/Product');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require("../utils/dataUri");

// controllers/productController.js

// Create a new product

// Create a new product
exports.createProduct = async (req, res) => {
  try {
      // Destructure the incoming request body
      const {
          productName,
          sku,
          category,
          subCategory,
          childCategory,
          allowProductCondition,
          productCondition,
          allowProductPreorder,
          productPreorder,
          allowMinimumOrderQty,
          minimumOrderQty,
          manageStock,
          stockQuantity,
          allowEstimatedShippingTime,
          estimatedShippingTime,
          allowProductWholeSell,
          wholeSellEntries,
          allowProductMeasurement,
          productMeasurement,
          allowProductColors,
          colors,
          stock,
          description,
          buyReturnPolicy,
          allowProductSEO,
          price,
          discountPrice,
          youtubeUrl,
          tags,
          featureTags, // Get featureTags directly
      } = req.body;

      // Log the incoming product data
      console.log('Incoming Product Data:', req.body);

      // Validate the inputs
      if (!req.files || !req.files.featureImage) {
          return res.status(400).json({ message: 'Feature image is required.' });
      }
      if (description.length < 10) {
          return res.status(400).json({ message: 'Description must be at least 10 characters long.' });
      }
      if (buyReturnPolicy.length < 10) {
          return res.status(400).json({ message: 'Buy return policy must be at least 10 characters long.' });
      }
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
      if (!youtubeRegex.test(youtubeUrl)) {
          return res.status(400).json({ message: 'Invalid YouTube URL.' });
      }
      
      // Validate featureTags
      let parsedFeatureTags = [];
      if (Array.isArray(featureTags)) {
          parsedFeatureTags = featureTags.map(tag => {
              if (!tag.tag || !tag.color) {
                  throw new Error('Each feature tag must include a tag and a color.');
              }
              return tag; // Assume it's already an object
          });
      }

      // Process images
      let featureImageUrl = null;
      let galleryImagesUrls = [];
      
      const featureImage = req.files.featureImage[0];
      const fileUri = getDataUri(featureImage).content;
      const featureImageResult = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
      featureImageUrl = featureImageResult.secure_url;

      // Gallery images processing (if applicable)
      if (req.files && req.files.galleryImages) {
          galleryImagesUrls = await Promise.all(req.files.galleryImages.map(async (image) => {
              const fileUri = getDataUri(image).content;
              const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
              return result.secure_url;
          }));
      }

      // Create product instance
      const product = new Product({
          productName,
          sku,
          category,
          subCategory,
          childCategory,
          allowProductCondition,
          productCondition,
          allowProductPreorder,
          productPreorder,
          allowMinimumOrderQty,
          minimumOrderQty,
          manageStock,
          stockQuantity,
          allowEstimatedShippingTime,
          estimatedShippingTime,
          allowProductWholeSell,
          wholeSellEntries: JSON.parse(wholeSellEntries),
          allowProductMeasurement,
          productMeasurement,
          allowProductColors,
          colors: JSON.parse(colors),
          stock,
          description,
          buyReturnPolicy,
          allowProductSEO,
          featureImage: featureImageUrl,
          galleryImages: galleryImagesUrls,
          price,
          discountPrice,
          youtubeUrl,
          featureTags: parsedFeatureTags,
          tags,
      });

      // Save product to the database
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
// exports.updateProductStatus = async (req, res) => {
//   const { status } = req.body;
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { status }, { new: true });
//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
exports.updateProductStatus = async (req, res) => {
  const { status } = req.body;
  const productId = req.params.id;

  // Validate if productId exists in the request
  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    // Find and update the product by ID
    const updatedProduct = await Product.findByIdAndUpdate(productId, { status }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    // Handle error if the ID format is incorrect or other issues
    res.status(400).json({ message: error.message });
  }
};
