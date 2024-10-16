// controllers/categoryController.js
const Category = require('../models/BlogCategory');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.createCategory = async (req, res) => {
  const { name, slug } = req.body;
  const newCategory = new Category({ name, slug });

  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error });
  }
};

exports.updateCategory = async (req, res) => {
  const { slug } = req.params;
  const { name, slug: newSlug } = req.body;

  try {
    const category = await Category.findOneAndUpdate(
      { slug },
      { name, slug: newSlug },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error });
  }
};

exports.deleteCategory = async (req, res) => {
    try {
      const { id } = req.params; // This should be the _id
      const deletedCategory = await Category.findByIdAndDelete(id); // Use findByIdAndDelete to remove by _id
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  