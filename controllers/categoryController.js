const Category = require('../models/Category');

// Create a new category
const cloudinary = require('cloudinary').v2;

exports.createCategory = async (req, res) => {
  const { name, slug } = req.body;

  let imageUrl = null;
  if (req.file) {
    try {
      // Upload the image buffer to Cloudinary
      const result = await cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          return res.status(500).json({ message: 'Error uploading image' });
        }
        return result.secure_url;
      }).end(req.file.buffer); // Use the buffer instead of file path

      imageUrl = result.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return res.status(500).json({ message: 'Error uploading image' });
    }
  }

  const newCategory = new Category({
    name,
    slug,
    image: imageUrl, // Use Cloudinary URL
  });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error saving category:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
