const Deal = require('../models/dealModel');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require('../utils/dataUri');

// Create a new deal
exports.createDeal = async (req, res) => {
  try {
    const { text, details, dateLimit } = req.body;
    let imageUrl;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResult = await cloudinary.uploader.upload(fileUri.content, {
        folder: 'deals',
      });
      imageUrl = cloudResult.secure_url;
    }

    const deal = new Deal({ text, details, dateLimit, image: imageUrl });
    await deal.save();

    res.status(201).json({ success: true, deal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an existing deal
exports.updateDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, details, dateLimit } = req.body;

    let updateData = { text, details, dateLimit };

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResult = await cloudinary.uploader.upload(fileUri.content, {
        folder: 'deals',
      });
      updateData.image = cloudResult.secure_url;
    }

    const updatedDeal = await Deal.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({ success: true, deal: updatedDeal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a deal
exports.deleteDeal = async (req, res) => {
  try {
    const { id } = req.params;
    await Deal.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Deal deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all deals
exports.getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find().sort({ createdAt: -1 });
    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
