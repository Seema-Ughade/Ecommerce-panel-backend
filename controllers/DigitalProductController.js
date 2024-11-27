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
            imageURL,  // Main upload method (file or link)
            description,
            buyReturnPolicy,
            allowProductSEO,
            price,
            discountPrice,
            youtubeUrl,
            tags,
            featureTags,
        } = req.body;

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


        if (req.file) {
            const dataUri = getDataUri(req.file);
            const result = await cloudinary.uploader.upload(dataUri.content);
            const newImage = await Image.create({
              imagePath: result.secure_url,
              uploadType: "file",
            });
            return res.status(200).json({
              message: "Image uploaded successfully",
              data: newImage,
            });
          } else if (imageURL) {
            const result = await cloudinary.uploader.upload(imageURL);
            const newImage = await Image.create({
              imagePath: result.secure_url,
              uploadType: "link",
              imageURL,
            });
            return res.status(200).json({
              message: "Image URL processed successfully",
              data: newImage,
            });
          } else {
            return res.status(400).json({ message: "No file or URL provided" });
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
            featureImageUrl,
            galleryImagesUrls,
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
