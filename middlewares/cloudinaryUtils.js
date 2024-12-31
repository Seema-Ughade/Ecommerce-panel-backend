const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require('../utils/dataUri');

const uploadToCloudinary = async (file) => {
  try {
    const fileUri = getDataUri(file);
    const result = await cloudinary.uploader.upload(fileUri.content);
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

const removeFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error removing from Cloudinary:', error);
    throw error;
  }
};

module.exports = { uploadToCloudinary, removeFromCloudinary };

