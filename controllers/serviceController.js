// controllers/serviceController.js
const Service = require('../models/Service');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require('../utils/dataUri'); // Ensure you have a utility for converting files

const serviceController = {
  getAllServices: async (req, res) => {
    try {
      const services = await Service.find();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching services.' });
    }
  },

  createService: async (req, res) => {
    const { title, description } = req.body;
    let imageUrl = null;

    try {
      if (req.file) {
        const fileUri = getDataUri(req.file).content;
        const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
        imageUrl = result.secure_url;
      }

      const newService = await Service.create({ title, description, image: imageUrl });
      res.status(201).json(newService);
    } catch (error) {
      res.status(500).json({ message: 'Error creating service.' });
    }
  },

  updateService: async (req, res) => {
    const { title, description } = req.body;
    let imageUrl = req.body.image; // Keep existing image if not updating

    try {
      if (req.file) {
        const fileUri = getDataUri(req.file).content;
        const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
        imageUrl = result.secure_url;
      }

      const updatedService = await Service.findByIdAndUpdate(req.params.id, { title, description, image: imageUrl }, { new: true });
      if (!updatedService) return res.status(404).json({ message: 'Service not found.' });
      res.json(updatedService);
    } catch (error) {
      res.status(500).json({ message: 'Error updating service.' });
    }
  },

  deleteService: async (req, res) => {
    try {
      const deletedService = await Service.findByIdAndDelete(req.params.id);
      if (!deletedService) return res.status(404).json({ message: 'Service not found.' });
      res.json({ message: 'Service deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting service.' });
    }
  },
};

module.exports = serviceController;
