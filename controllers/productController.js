const Product = require('../models/Product');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require("../utils/dataUri");

// controllers/productController.js

// Create a new product

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        // Extract product data from the request body
        const { productName, sku, category, subCategory, childCategory, ...otherData } = req.body;
        console.log('Incoming Product Data:', req.body);


        let parsedFeatureTags = [];
        if (req.body.featureTags) {
            // If featureTags is an array of JSON strings, parse each one
            if (Array.isArray(req.body.featureTags)) {
                parsedFeatureTags = req.body.featureTags.map(tag => JSON.parse(tag));
            } else {
                // If it's a single JSON string, parse it
                parsedFeatureTags.push(JSON.parse(featureTags));
            }
        }
        let featureImageUrl = null;
        let galleryImagesUrls = [];
    
        // Check if a feature image is uploaded
        if (req.files && req.files.featureImage) {
          const featureImage = req.files.featureImage[0];
          const fileUri = getDataUri(featureImage).content; // Convert to Data URI
    
          // Upload the feature image to Cloudinary
          const featureImageResult = await cloudinary.uploader.upload(fileUri, {
            resource_type: 'auto',
          });
          featureImageUrl = featureImageResult.secure_url; // Get the secure URL from Cloudinary response
        }
    
        // Check if there are gallery images uploaded
        if (req.files && req.files.galleryImages) {
          galleryImagesUrls = await Promise.all(req.files.galleryImages.map(async (image) => {
            const fileUri = getDataUri(image).content; // Convert to Data URI
            const result = await cloudinary.uploader.upload(fileUri, {
              resource_type: 'auto',
            });
            return result.secure_url; // Get the secure URL from Cloudinary response
          }));
        }
    
            // Create a new product instance
        const product = new Product({
            productName,
            sku,
            category,
            subCategory,
            childCategory,
            featureImageUrl,
            galleryImagesUrls,
                  featureTags: parsedFeatureTags, // Use parsed feature tags
            // Parse feature tags if provided

            ...otherData, // Spread other fields
        });

        await product.save(); // Save the product to the database
        res.status(201).json({ message: 'Product created successfully', product }); // Respond with success message
    } catch (error) {
        console.error('Error creating product:', error.message); // Log error message
        res.status(500).json({ message: 'Error creating product', error }); // Respond with error message
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
