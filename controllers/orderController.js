const Product = require('../models/Order');

// Get all users
exports.getAllProducts = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Create a new user
exports.createProduct = async (req, res) => {
  const { name, email, phone, address, country, city, state, postalCode } = req.body;
  try {
    const user = new User({ name, email, phone, address, country, city, state, postalCode });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};
