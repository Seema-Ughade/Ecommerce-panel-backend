// controllers/pageController.js
const Page = require('../models/Page');
const cloudinary = require('../middlewares/cloudinaryConfig'); // Assuming the Cloudinary configuration is in this file
const getDataUri = require("../utils/dataUri"); // Adjust the path if needed

// Upload image to Cloudinary
const uploadImage = async (file) => {
  const fileUri = getDataUri(file).content; // Convert file to data URI
  const result = await cloudinary.uploader.upload(fileUri, { folder: 'pages', resource_type: 'auto' });
  return result.secure_url; // Return the secure URL
};

// Create a new page
exports.createPage = async (req, res) => {
  try {
    const { title, slug, description, seo } = req.body;
    let image = null;

    if (req.file) {
      image = await uploadImage(req.file);
    }

    const page = new Page({ title, slug, description, seo, image });
    await page.save();
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Error creating page', error });
  }
};

// Get all pages
exports.getPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pages', error });
  }
};

// Update a page
exports.updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, description, seo } = req.body;
    let image = null;

    if (req.file) {
      image = await uploadImage(req.file);
    }

    const updatedData = { title, slug, description, seo };
    if (image) updatedData.image = image;

    const page = await Page.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Error updating page', error });
  }
};

// Delete a page
exports.deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    await Page.findByIdAndDelete(id);
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting page', error });
  }
};


exports.updateHeaderChange = async (req, res) => {
    const { Header } = req.body;
    try {
      const updatedPage = await Page.findByIdAndUpdate(req.params.id, { Header }, { new: true });
      res.json(updatedPage);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.updateFooterChange = async (req, res) => {
    const { Footer } = req.body;
    try {
      const updatedPage = await Page.findByIdAndUpdate(req.params.id, { Footer }, { new: true });
      res.json(updatedPage);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  