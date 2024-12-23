const Rider = require('../models/Rider');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, address, password } = req.body;

    // Check if rider already exists
    let rider = await Rider.findOne({ email });
    if (rider) {
      return res.status(400).json({ message: 'Rider already exists' });
    }

    // Create new rider
    rider = new Rider({
      fullName,
      email,
      phoneNumber,
      address,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    rider.password = await bcrypt.hash(password, salt);

    await rider.save();

    // Create and return JWT token
    const payload = {
      rider: {
        id: rider.id
      }
    };

    jwt.sign(
      payload,
      'your_jwt_secret',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if rider exists
    let rider = await Rider.findOne({ email });
    if (!rider) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, rider.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and return JWT token
    const payload = {
      rider: {
        id: rider.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_jwt_secret', // Use environment variable for secret
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

