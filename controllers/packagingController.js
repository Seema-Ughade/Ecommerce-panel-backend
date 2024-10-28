// controllers/packagingController.js
const Packaging = require('../models/Packaging');

// Get all packagings
exports.getAllPackagings = async (req, res) => {
  try {
    const packagings = await Packaging.find();
    res.status(200).json(packagings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packagings', error });
  }
};

// Create a new packaging
exports.createPackaging = async (req, res) => {
  const { title, subtitle, price } = req.body;
  try {
    const newPackaging = new Packaging({ title, subtitle, price });
    await newPackaging.save();
    res.status(201).json(newPackaging);
  } catch (error) {
    res.status(500).json({ message: 'Error creating packaging', error });
  }
};

// Update a packaging
exports.updatePackaging = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, price } = req.body;
  try {
    const updatedPackaging = await Packaging.findByIdAndUpdate(
      id,
      { title, subtitle, price },
      { new: true }
    );
    res.status(200).json(updatedPackaging);
  } catch (error) {
    res.status(500).json({ message: 'Error updating packaging', error });
  }
};

// Delete a packaging
exports.deletePackaging = async (req, res) => {
  const { id } = req.params;
  try {
    await Packaging.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting packaging', error });
  }
};
