// Import necessary modules
const Category = require('../models/Category'); // Import the Category model
const cloudinary = require('../middlewares/cloudinaryConfig'); // Import the Cloudinary configuration

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    // Destructure name and slug from the request body
    const { name, slug } = req.body;

    let imageUrl = null; // Initialize variable for the image URL
    if (req.file) {
      // Check if there is a file to upload
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            console.error('Error uploading to Cloudinary:', error);
            return reject(new Error('Error uploading image'));
          }
          resolve(result); // Resolve the promise with the result
        });

        // End the stream with the image buffer
        uploadStream.end(req.file.buffer);
      });

      // Get the secure URL from the upload result
      imageUrl = result.secure_url;
    }

    // Create a new category instance
    const newCategory = new Category({
      name,
      slug,
      image: imageUrl, // Use the Cloudinary image URL if available
    });

    // Save the new category to the database
    const savedCategory = await newCategory.save();
    // Send a 201 Created response with the saved category data
    res.status(201).json(savedCategory);
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.error('Error adding category:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    // Retrieve all categories from the database
    const categories = await Category.find();
    // Send a 200 OK response with the categories
    res.status(200).json(categories);
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: error.message });
  }
};
