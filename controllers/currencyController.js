// controllers/currencyController.js

const Currency = require('../models/currencyModel');

// Get all currencies
exports.getCurrencies = async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.json(currencies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching currencies' });
  }
};

// Add a new currency
exports.addCurrency = async (req, res) => {
  try {
    const { name, sign, value } = req.body;
    const newCurrency = new Currency({ name, sign, value });
    await newCurrency.save();
    res.status(201).json(newCurrency);
  } catch (error) {
    res.status(500).json({ message: 'Error adding currency' });
  }
};

// Delete a currency by ID
exports.deleteCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCurrency = await Currency.findByIdAndDelete(id);
    if (!deletedCurrency) return res.status(404).json({ message: 'Currency not found' });
    res.json({ message: 'Currency deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting currency' });
  }
};


exports.updateCurrency = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, sign, value } = req.body;
  
      const updatedCurrency = await Currency.findByIdAndUpdate(
        id,
        { name, sign, value },
        { new: true, runValidators: true }
      );
  
      if (!updatedCurrency) return res.status(404).json({ message: 'Currency not found' });
      
      res.json(updatedCurrency);
    } catch (error) {
      res.status(500).json({ message: 'Error updating currency' });
    }
  };
  
  