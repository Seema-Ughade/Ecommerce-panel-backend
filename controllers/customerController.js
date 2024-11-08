// controllers/customerController.js
const Customer = require('../models/Customer');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require('../utils/dataUri');

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers' });
  }
};

// Add a new customer
exports.createCustomer = async (req, res) => {
    const { name, username, email, phone, address, city, state, country, fax, postalCode, password } = req.body;
    let featureImageUrl = null;
  
    // Upload image to Cloudinary if there is a file in the request
    if (req.file) {
      const fileUri = getDataUri(req.file).content;
      try {
        const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
        featureImageUrl = result.secure_url; // Store the secure URL from Cloudinary
      } catch (error) {
        return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
      }
    }
  
    try {
      // Create a new customer instance with the provided data and featureImage image URL
      const newCustomer = new Customer({
        featureImage: featureImageUrl,
        name,
        username,
        email,
        phone,
        address,
        city,
        state,
        country,
        fax,
        postalCode,
        password,
      });
  
      // Save the new customer to the database
      const savedCustomer = await newCustomer.save();
      res.status(201).json(savedCustomer);
    } catch (error) {
      res.status(500).json({ message: 'Error creating customer', error });
    }
  };
  // Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer' });
  }
};

// Update customer status
exports.updateCustomerStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer status' });
  }
};
