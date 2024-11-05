// controllers/cityController.js
const City = require('../models/City');

// Get all cities
exports.getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cities' });
  }
};

// Add a new city
exports.createCity = async (req, res) => {
  const { state, city } = req.body;
  try {
    const newCity = new City({ state, city });
    await newCity.save();
    res.status(201).json(newCity);
  } catch (error) {
    res.status(400).json({ message: 'Error creating city' });
  }
};

// Update a city
exports.updateCity = async (req, res) => {
  const { id } = req.params;
  const { state, city } = req.body;
  try {
    const updatedCity = await City.findByIdAndUpdate(id, { state, city }, { new: true });
    if (!updatedCity) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(updatedCity);
  } catch (error) {
    res.status(400).json({ message: 'Error updating city' });
  }
};

// Delete a city
exports.deleteCity = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCity = await City.findByIdAndDelete(id);
    if (!deletedCity) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting city' });
  }
};

// Controller function for updating city status
exports.updateCityStatus = async (req, res) => {
    const { status } = req.body;
    try {
      const updatedCity = await City.findByIdAndUpdate(req.params.id, { status }, { new: true });
      res.json(updatedCity);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
    