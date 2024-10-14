const SubCategory = require('../models/SubCategory');

// Fetch all subcategories
const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json({ subCategories });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error });
  }
};

// Create a new subcategory
const createSubCategory = async (req, res) => {
  const { mainCategory, name, slug } = req.body;
  const newSubCategory = new SubCategory({ mainCategory, name, slug });

  try {
    await newSubCategory.save();
    res.status(201).json({ message: 'Subcategory created successfully', newSubCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error creating subcategory', error });
  }
};

// Update an existing subcategory
const updateSubCategory = async (req, res) => {
  const { id } = req.params; // Get the subcategory ID from the request parameters
  const { mainCategory, name, slug } = req.body; // Get the updated data from the request body

  try {
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      { mainCategory, name, slug },
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedSubCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory updated successfully', updatedSubCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error updating subcategory', error });
  }
};

// Delete a subcategory
const deleteSubCategory = async (req, res) => {
  const { id } = req.params; // Get the subcategory ID from the request parameters

  try {
    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

    if (!deletedSubCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subcategory', error });
  }
};

module.exports = {
  getAllSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
