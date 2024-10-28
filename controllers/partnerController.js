const Partner = require('../models/Partner');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require('../utils/dataUri'); // Ensure you have a utility for converting files

// Fetch all partners
exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching partners', error });
  }
};

// Create a new partner
exports.createPartner = async (req, res) => {
  try {
    const { link } = req.body;
    let imageUrl = null;

    // Upload the image to Cloudinary if provided
    if (req.file) {
      const fileUri = getDataUri(req.file).content;
      const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
      imageUrl = result.secure_url;
    }

    const newPartner = new Partner({ link, image: imageUrl });
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    console.error('Error creating partner:', error.message);
    res.status(500).json({ message: 'Error creating partner', error });
  }
};

// Update a partner
exports.updatePartner = async (req, res) => {
  try {
    const { link } = req.body;
    let imageUrl = req.body.image; // Keep existing image if not updating

    // Upload the new image to Cloudinary if provided
    if (req.file) {
      const fileUri = getDataUri(req.file).content;
      const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
      imageUrl = result.secure_url;
    }

    const updatedPartner = await Partner.findByIdAndUpdate(
      req.params.id,
      { link, image: imageUrl },
      { new: true }
    );

    res.status(200).json(updatedPartner);
  } catch (error) {
    console.error('Error updating partner:', error.message);
    res.status(500).json({ message: 'Error updating partner', error });
  }
};

// Delete a partner
exports.deletePartner = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the partner by ID
    const deletedPartner = await Partner.findByIdAndDelete(id);

    // Check if the partner was found and deleted
    if (!deletedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    // Optional: Delete the image from Cloudinary as well
    // const publicId = deletedPartner.image.split('/').pop().split('.')[0]; // Extract public ID from the URL
    // await cloudinary.uploader.destroy(publicId); // Uncomment to delete from Cloudinary

    res.status(200).json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error.message);
    res.status(500).json({ message: 'Error deleting partner', error });
  }
};
