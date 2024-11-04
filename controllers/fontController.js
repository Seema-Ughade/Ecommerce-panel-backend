// controllers/fontController.js
const Font = require('../models/Font');

// Fetch all fonts
exports.getFonts = async (req, res) => {
  try {
    const fonts = await Font.find();
    res.status(200).json(fonts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new font
exports.createFont = async (req, res) => {
  const font = new Font({
    family: req.body.family,
  });
  
  try {
    const savedFont = await font.save();
    res.status(201).json(savedFont);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing font
exports.updateFont = async (req, res) => {
  try {
    const font = await Font.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(font);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a font
exports.deleteFont = async (req, res) => {
  try {
    await Font.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
