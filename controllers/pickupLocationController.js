const PickupLocation = require('../models/PickupLocation');

// Get all pickup locations
const getPickupLocations = async (req, res) => {
  try {
    const locations = await PickupLocation.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pickup locations', error });
  }
};

// Create a new pickup location
const createPickupLocation = async (req, res) => {
  const { location } = req.body;
  const newPickupLocation = new PickupLocation({ location });

  try {
    const savedLocation = await newPickupLocation.save();
    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(400).json({ message: 'Error creating pickup location', error });
  }
};

// Update an existing pickup location
const updatePickupLocation = async (req, res) => {
  const { id } = req.params;
  const { location } = req.body;

  try {
    const updatedLocation = await PickupLocation.findByIdAndUpdate(id, { location }, { new: true });
    if (!updatedLocation) {
      return res.status(404).json({ message: 'Pickup location not found' });
    }
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ message: 'Error updating pickup location', error });
  }
};

// Delete a pickup location
const deletePickupLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLocation = await PickupLocation.findByIdAndDelete(id);
    if (!deletedLocation) {
      return res.status(404).json({ message: 'Pickup location not found' });
    }
    res.status(200).json({ message: 'Pickup location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pickup location', error });
  }
};

module.exports = {
  getPickupLocations,
  createPickupLocation,
  updatePickupLocation,
  deletePickupLocation,
};
