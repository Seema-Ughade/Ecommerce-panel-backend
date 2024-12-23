
const Category = require('../models/Category');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require("../utils/dataUri"); // Adjust the path to your utility file

//createCategory
exports.createCategory = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  try {
    // Destructure name and slug from the request body
    const { name, slug } = req.body;

    // Initialize variable for the image URL
    let imageUrl = null;

    // Check if there is a file to upload
    if (req.file) {
      // Use getDataUri to convert the file to a data URI
      const fileUri = getDataUri(req.file).content;

      // Upload the file as a data URI to Cloudinary
      const result = await cloudinary.uploader.upload(fileUri, {
        resource_type: 'auto',
      });
      
      imageUrl = result.secure_url; // Get the secure URL from the upload result
    }

    // Create a new category instance
    const newCategory = new Category({
      name,
      slug,
      image: imageUrl, // Use the Cloudinary image URL if available
    });

    // Save the new category to the database
    const savedCategory = await newCategory.save();

    // Send a 201 Created response with the saved category data
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error adding category:', error.message); // Log detailed error message
    res.status(500).json({ message: 'Error adding category' });
  }
};

// updateCategory
exports.updateCategory = async (req, res) => {
  console.log('Updating category ID:', req.params.id);
  console.log('Request body:', req.body);

  try {
    const { name, slug } = req.body;
    let imageUrl = null;

    // Check if there's a file to upload
    if (req.file) {
      const fileUri = getDataUri(req.file).content;
      const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
      imageUrl = result.secure_url; // Get the secure URL from the upload result
    }

    // Prepare the update object, only include fields that are defined
    const updateFields = {};
    if (name) updateFields.name = name; // Include name if it exists
    if (slug) updateFields.slug = slug; // Include slug if it exists
    if (imageUrl) updateFields.image = imageUrl; // Include image URL if it exists

    // Update the category with the new data
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateFields, // Use the prepared update object
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(updatedCategory); // Return the updated category
  } catch (error) {
    console.error('Error updating category:', error); // Log the entire error
    res.status(400).json({ message: 'Error updating category', error: error.message }); // Include the error message
  }
};

//getAllCategories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//deleteCategory
exports.deleteCategory = async (req, res) => {
  const { id } = req.params; // Get the category ID from the request parameters
  try {
    // Find the category by ID and delete it
    const deletedCategory = await Category.findByIdAndDelete(id);
    
    // Check if the category was found and deleted
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    // Send a success response
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Error deleting category' });
  }
};

// Update category status
// Update category status
exports.updateCategoryStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update category featured
exports.updateCategoryfeatured = async (req, res) => {
  const { featured } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { featured }, { new: true });
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Add attribute to category
exports.addAttributeToCategory = async (req, res) => {
  const { name, option, allowPriceField, showOnDetailsPage } = req.body;

  try {
    const category = await Category.findById(req.params.categoryId);
    category.attributes.push({ name, option, allowPriceField, showOnDetailsPage });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an attribute within a category
exports.updateCategoryAttribute = async (req, res) => {
  const { name, option, allowPriceField, showOnDetailsPage } = req.body;
  
  try {
    const category = await Category.findById(req.params.categoryId);
    const attribute = category.attributes.id(req.params.attributeId);

    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }

    // Update the attribute fields
    attribute.name = name;
    attribute.option = option;
    attribute.allowPriceField = allowPriceField;
    attribute.showOnDetailsPage = showOnDetailsPage;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete an attribute from a category
exports.deleteCategoryAttribute = async (req, res) => {
  try {
    const { categoryId, attributeId } = req.params;

    const category = await Category.findById(categoryId);

    // Find and remove the attribute by its ID
    const attributeIndex = category.attributes.findIndex(attr => attr._id.toString() === attributeId);
    if (attributeIndex !== -1) {
      category.attributes.splice(attributeIndex, 1); // Remove the attribute
      await category.save();
      return res.status(200).json({ message: 'Attribute deleted successfully' });
    }

    return res.status(404).json({ message: 'Attribute not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
