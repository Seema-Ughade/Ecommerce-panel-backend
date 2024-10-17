// controllers/childCategoryController.js
const ChildCategory = require('../models/ChildCategory');

// Get all child categories
exports.getAllChildCategories = async (req, res) => {
  try {
    const childCategories = await ChildCategory.find();
    res.status(200).json(childCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching child categories', error });
  }
};

// Create a new child category
exports.createChildCategory = async (req, res) => {
  const newChildCategory = new ChildCategory(req.body);
  try {
    await newChildCategory.save();
    res.status(201).json(newChildCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating child category', error });
  }
};

// Delete a child category
exports.deleteChildCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChildCategory = await ChildCategory.findByIdAndDelete(id);
    if (!deletedChildCategory) {
      return res.status(404).json({ message: 'Child category not found' });
    }
    res.status(200).json({ message: 'Child category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting child category', error });
  }
};
