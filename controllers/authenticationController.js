const Staff = require('../models/Staff');
const jwt = require('jsonwebtoken');

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists and populate role with permissions
    const staff = await Staff.findOne({ email }).populate({
      path: 'role',
      select: 'permissions' // Only select the permissions field from the role
    });

    if (!staff) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Validate password
    console.log(`Attempting to validate password for email: ${email}`);
    if (staff.password !== password) { // Direct comparison
      console.log('Password validation failed.');
      return res.status(400).json({ message: 'Invalid password.' });
    }

    // Generate JWT token with role permissions
    const token = jwt.sign(
      { staffId: staff._id, role: staff.role._id, permissions: staff.role.permissions },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Respond with token and user details
    res.status(200).json({
      token,
      user: {
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        role: {
          _id: staff.role._id,
          name: staff.role.name,
          permissions: staff.role.permissions
        }
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

module.exports = {
  login,
};
