const User = require('../models/Vendor')
const jwt = require('jsonwebtoken')

exports.registerVendor = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, address, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      })
    }

    // Create new vendor
    const user = new User({
      fullName,
      email,
      phoneNumber,
      address,
      password,
      role: 'vendor'
    })

    await user.save()

    res.status(201).json({
      success: true,
      message: 'Vendor registered successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering vendor',
      error: error.message
    })
  }
}

exports.loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email, role: 'vendor' })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    })
  }
}

