const Offer = require('../models/Offer');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require('../utils/dataUri');

// Create Offer
exports.createOffer = async (req, res) => {
  try {
    const { url } = req.body;
    let imageUrl;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResult = await cloudinary.uploader.upload(fileUri.content, {
        folder: 'bestMonthOffers',
      });
      imageUrl = cloudResult.secure_url;
    }

    const offer = new Offer({ url, image: imageUrl });
    await offer.save();

    res.status(201).json({ success: true, data: offer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Offer
exports.updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;

    let updatedData = { url };
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResult = await cloudinary.uploader.upload(fileUri.content, {
        folder: 'bestMonthOffers',
      });
      updatedData.image = cloudResult.secure_url;
    }

    const updatedOffer = await Offer.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({ success: true, data: updatedOffer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Offer
exports.deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    await Offer.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Offers
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
