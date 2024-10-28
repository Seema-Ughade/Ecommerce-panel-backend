const ShippingMethod = require('../models/ShippingMethod');

// Get all shipping methods
const getShippingMethods = async (req, res) => {
  try {
    const methods = await ShippingMethod.find();
    res.status(200).json(methods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new shipping method
const createShippingMethod = async (req, res) => {
  const { title, duration, price } = req.body;

  const newMethod = new ShippingMethod({
    title,
    duration,
    price,
  });

  try {
    const savedMethod = await newMethod.save();
    res.status(201).json(savedMethod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a shipping method
const updateShippingMethod = async (req, res) => {
  const { id } = req.params;
  const { title, duration, price } = req.body;

  try {
    const updatedMethod = await ShippingMethod.findByIdAndUpdate(
      id,
      { title, duration, price },
      { new: true }
    );
    res.status(200).json(updatedMethod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a shipping method
const deleteShippingMethod = async (req, res) => {
  const { id } = req.params;

  try {
    await ShippingMethod.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getShippingMethods,
  createShippingMethod,
  updateShippingMethod,
  deleteShippingMethod,
};
