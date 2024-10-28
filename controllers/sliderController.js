// controllers/sliderController.js
const Slider = require('../models/Slider');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require('../utils/dataUri'); // Ensure you have a utility for converting files


exports.createSlider = async (req, res) => {
  try {
    const { name, slug } = req.body;
    let imageUrl = null;

    if (req.file) {
      const fileUri = getDataUri(req.file).content;
      const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
      imageUrl = result.secure_url;
    }

    const newSlider = new Slider({ name, slug, image: imageUrl });
    const savedSlider = await newSlider.save();
    res.status(201).json(savedSlider);
  } catch (error) {
    console.error('Error adding slider:', error.message);
    res.status(500).json({ message: 'Error adding slider' });
  }
};

exports.updateSlider = async (req, res) => {
  try {
    const { name, slug } = req.body;
    let imageUrl = req.body.image; // Keep existing image if not updating

    if (req.file) {
      const fileUri = getDataUri(req.file).content;
      const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
      imageUrl = result.secure_url;
    }

    const updatedSlider = await Slider.findByIdAndUpdate(
      req.params.id,
      { name, slug, image: imageUrl },
      { new: true }
    );

    res.status(200).json(updatedSlider);
  } catch (error) {
    console.error('Error updating slider:', error.message);
    res.status(500).json({ message: 'Error updating slider' });
  }
};

exports.getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
  } catch (error) {
    console.error('Error fetching sliders:', error.message);
    res.status(500).json({ message: 'Error fetching sliders' });
  }
};

// controllers/sliderController.js

exports.deleteSlider = async (req, res) => {
    const { id } = req.params; // Get the slider ID from the request parameters
    try {
      // Find the slider by ID and delete it
      const deletedSlider = await Slider.findByIdAndDelete(id);
      
      // Check if the slider was found and deleted
      if (!deletedSlider) {
        return res.status(404).json({ message: 'Slider not found' });
      }
  
      // If you want to delete the image from Cloudinary as well, uncomment the following lines:
      // const publicId = deletedSlider.image.split('/').pop().split('.')[0]; // Extract public ID from the URL
      // await cloudinary.uploader.destroy(publicId); // Delete the image from Cloudinary
  
      // Send a success response
      res.status(200).json({ message: 'Slider deleted successfully' });
    } catch (error) {
      // Handle errors and send an appropriate response
      console.error('Error deleting slider:', error.message);
      res.status(500).json({ message: 'Error deleting slider' });
    }
  };
  