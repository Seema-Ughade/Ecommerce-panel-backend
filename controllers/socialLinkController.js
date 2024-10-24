const SocialLink = require('../models/SocialLink');

// Get all social links
exports.getSocialLinks = async (req, res) => {
  try {
    const links = await SocialLink.find();
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new social link
exports.createSocialLink = async (req, res) => {
  const { name, icon } = req.body;
  const newLink = new SocialLink({ name, icon });

  try {
    const savedLink = await newLink.save();
    res.status(201).json(savedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSocialStatus = async (req, res) => {
    const { status } = req.body;
    try {
      // Find the social link by ID and update its status
      const updatedSocialLink = await SocialLink.findByIdAndUpdate(req.params.id, { status }, { new: true });
      res.json(updatedSocialLink);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
    
// Update a social link
exports.updateSocialLink = async (req, res) => {
  try {
    const updatedLink = await SocialLink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a social link
exports.deleteSocialLink = async (req, res) => {
  try {
    await SocialLink.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
