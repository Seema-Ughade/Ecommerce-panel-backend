const SubCategory = require('../models/SubCategory');

// Fetch all subcategories
const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.json(subCategories);

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

// Update category status
const updateSubCategoryStatus = async (req, res) => {
  const { status } = req.body;
  console.log(`Updating subcategory ID: ${req.params.id} with status: ${status}`); // Add this line for debugging
  try {
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedSubCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.json(updatedSubCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Add an attribute to a subcategory
const addAttributeToCategory = async (req, res) => {
  const { name, option, allowPriceField, showOnDetailsPage } = req.body;

  try {
    const subCategory = await SubCategory.findById(req.params.SubCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    subCategory.attributes.push({ name, option, allowPriceField, showOnDetailsPage });
    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an attribute within a subcategory
const updateCategoryAttribute = async (req, res) => {
  const { name, option, allowPriceField, showOnDetailsPage } = req.body;

  try {
    const subCategory = await SubCategory.findById(req.params.SubCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const attribute = subCategory.attributes.id(req.params.attributeId);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }

    // Update the attribute fields
    attribute.name = name;
    attribute.option = option;
    attribute.allowPriceField = allowPriceField;
    attribute.showOnDetailsPage = showOnDetailsPage;

    await subCategory.save();
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an attribute from a subcategory
const deleteCategoryAttribute = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.SubCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const attribute = subCategory.attributes.id(req.params.attributeId);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }

    // Remove the attribute
    attribute.remove();
    await subCategory.save();
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Export all functions
module.exports = {
  getAllSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  addAttributeToCategory,
  updateCategoryAttribute,
  deleteCategoryAttribute,
  updateSubCategoryStatus
};
