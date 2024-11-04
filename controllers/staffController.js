const Staff = require('../models/Staff');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require('../utils/dataUri');

// Create a new staff
exports.createStaff = async (req, res) => {
  const { name, email, phone, role, password } = req.body;
  let profileImageUrl = null;

  // Upload image to Cloudinary
  if (req.file) {
    const fileUri = getDataUri(req.file).content;
    const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
    profileImageUrl = result.secure_url; // Store the secure URL from Cloudinary
  }

  try {
    const newStaff = new Staff({ name, email, phone, role, password, profileImage: profileImageUrl });
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json({ message: 'Error creating staff', error });
  }
};

// Get all staff
exports.getStaffs = async (req, res) => {
  try {
    const staffs = await Staff.find().populate('role'); // Populate role if needed
    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staffs', error });
  }
};

// Update a staff
exports.updateStaff = async (req, res) => {
  const { id } = req.params;
  let updatedData = { ...req.body };

  if (req.file) {
    const fileUri = getDataUri(req.file).content;
    const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
    updatedData.profileImage = result.secure_url; // Update profile image if a new one is uploaded
  }

  try {
    const updatedStaff = await Staff.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ message: 'Error updating staff', error });
  }
};

// Delete a staff
exports.deleteStaff = async (req, res) => {
  const { id } = req.params;
  try {
    await Staff.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting staff', error });
  }
};
