// // Import necessary modules
// const Category = require('../models/Category'); // Import the Category model
// const cloudinary = require('../middlewares/cloudinaryConfig'); // Import the Cloudinary configuration

// // Create a new category
// exports.createCategory = async (req, res) => {
//   try {
//     // Destructure name and slug from the request body
//     const { name, slug } = req.body;

//     let imageUrl = null; // Initialize variable for the image URL
//     if (req.file) {
//       // Check if there is a file to upload
//       const result = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
//           if (error) {
//             console.error('Error uploading to Cloudinary:', error);
//             return reject(new Error('Error uploading image'));
//           }
//           resolve(result); // Resolve the promise with the result
//         });

//         // End the stream with the image buffer
//         uploadStream.end(req.file.buffer);
//       });

//       // Get the secure URL from the upload result
//       imageUrl = result.secure_url;
//     }

//     // Create a new category instance
//     const newCategory = new Category({
//       name,
//       slug,
//       image: imageUrl, // Use the Cloudinary image URL if available
//     });

//     // Save the new category to the database
//     const savedCategory = await newCategory.save();
//     // Send a 201 Created response with the saved category data
//     res.status(201).json(savedCategory);
//   } catch (error) {
//     // Log the error and send a 500 Internal Server Error response
//     console.error('Error adding category:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all categories
// exports.getAllCategories = async (req, res) => {
//   try {
//     // Retrieve all categories from the database
//     const categories = await Category.find();
//     // Send a 200 OK response with the categories
//     res.status(200).json(categories);
//   } catch (error) {
//     // Log the error and send a 500 Internal Server Error response
//     console.error('Error fetching categories:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// controllers/categoryController.js

const Category = require('../models/Category');
const cloudinary = require('../middlewares/cloudinaryConfig');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    // Destructure name and slug from the request body
    const { name, slug } = req.body;

    // Initialize variable for the image URL
    let imageUrl = null;

    // Check if there is a file to upload
    if (req.file) {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
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
    // Log the error and send a 500 Internal Server Error response
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Error adding category' });
  }
};
// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

// Create a new category
// exports.createCategory = async (req, res) => {
//   const { name, slug } = req.body;
//   const newCategory = new Category({
//     name,
//     slug,
//     image: req.file ? req.file.path : null,
//   });

//   try {
//     const savedCategory = await newCategory.save();
//     res.status(201).json(savedCategory);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Update category status
exports.updateCategoryStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateCategoryfeatured = async (req, res) => {
  const { featured } = req.body;

  try {
    const updatedCategoryfeatured = await Category.findByIdAndUpdate(
      req.params.id,
      { featured },
      { new: true }
    );
    res.json(updatedCategoryfeatured);
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
    const category = await Category.findById(req.params.categoryId);
    category.attributes.id(req.params.attributeId).remove(); // Remove the attribute
    await category.save();
    res.status(200).json({ message: 'Attribute deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
