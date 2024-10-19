// // controllers/childCategoryController.js
// const ChildCategory = require('../models/ChildCategory');

// // Get all child categories
// exports.getAllChildCategories = async (req, res) => {
//   try {
//     const childCategories = await ChildCategory.find();
//     res.status(200).json(childCategories);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching child categories', error });
//   }
// };

// // Create a new child category
// exports.createChildCategory = async (req, res) => {
//   const newChildCategory = new ChildCategory(req.body);
//   try {
//     await newChildCategory.save();
//     res.status(201).json(newChildCategory);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating child category', error });
//   }
// };

// // Delete a child category
// exports.deleteChildCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedChildCategory = await ChildCategory.findByIdAndDelete(id);
//     if (!deletedChildCategory) {
//       return res.status(404).json({ message: 'Child category not found' });
//     }
//     res.status(200).json({ message: 'Child category deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting child category', error });
//   }
// };

// exports.addAttributeToCategory = async (req, res) => {
//   const { name, option, allowPriceField, showOnDetailsPage } = req.body;

//   try {
//     const ChildCategory = await ChildCategory.findById(req.params.ChildCategoryId);
//     ChildCategory.attributes.push({ name, option, allowPriceField, showOnDetailsPage });
//     await ChildCategory.save();
//     res.status(201).json(ChildCategory);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// exports.updateCategoryAttribute = async (req, res) => {
//   const { name, option, allowPriceField, showOnDetailsPage } = req.body;
  
//   try {
//     const ChildCategory = await ChildCategory.findById(req.params.categoryId);
//     const attribute = category.attributes.id(req.params.attributeId);

//     if (!attribute) {
//       return res.status(404).json({ message: "Attribute not found" });
//     }

//     // Update the attribute fields
//     attribute.name = name;
//     attribute.option = option;
//     attribute.allowPriceField = allowPriceField;
//     attribute.showOnDetailsPage = showOnDetailsPage;

//     await category.save();
//     res.status(200).json(category);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// // Delete an attribute from a category
// exports.deleteCategoryAttribute = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.categoryId);
//     category.attributes.id(req.params.attributeId).remove(); // Remove the attribute
//     await category.save();
//     res.status(200).json({ message: 'Attribute deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Import the ChildCategory model
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


exports.updateCategoryStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const updatedChildCategory = await ChildCategory.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedChildCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with '-'
    .replace(/^-|-$/g, '')       // Remove leading or trailing hyphens
    .trim();                     // Remove any extra spaces
};



// Add an attribute to a child category
exports.addAttributeToChildCategory = async (req, res) => {
  const { childCategoryId } = req.params; // Get child category ID from URL parameters
  const newAttribute = req.body; // Get the new attribute from the request body

  try {
    // Find the child category by ID
    const childCategory = await ChildCategory.findById(childCategoryId);
    
    if (!childCategory) {
      return res.status(404).json({ message: 'Child category not found' }); // Return error if not found
    }

    // Push the new attribute into the attributes array of the child category
    childCategory.attributes.push(newAttribute);
    
    // Save the updated child category
    await childCategory.save();
    
    // Return the updated child category
    return res.status(200).json(childCategory);
    
  } catch (error) {
    console.error('Error adding attribute:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// Update an attribute in a child category
exports.updateCategoryAttribute = async (req, res) => {
  const { name, option, allowPriceField, showOnDetailsPage } = req.body;

  try {
    const childCategory = await ChildCategory.findById(req.params.ChildCategoryId);
    if (!childCategory) {
      return res.status(404).json({ message: 'Child category not found' });
    }

    // Find the attribute by its ID
    const attribute = childCategory.attributes.id(req.params.attributeId);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }

    // Update the attribute fields
    attribute.name = name;
    attribute.option = option;
    attribute.allowPriceField = allowPriceField;
    attribute.showOnDetailsPage = showOnDetailsPage;

    // Save the updated child category
    await childCategory.save();
    res.status(200).json(childCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an attribute from a child category
exports.deleteCategoryAttribute = async (req, res) => {
  try {
    const childCategory = await ChildCategory.findById(req.params.ChildCategoryId);
    if (!childCategory) {
      return res.status(404).json({ message: 'Child category not found' });
    }

    // Remove the attribute by its ID
    const attribute = childCategory.attributes.id(req.params.attributeId);
    if (!attribute) {
      return res.status(404).json({ message: 'Attribute not found' });
    }
    attribute.remove(); // Remove the attribute

    // Save the updated child category
    await childCategory.save();
    res.status(200).json({ message: 'Attribute deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
