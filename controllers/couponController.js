// controllers/couponController.js
const Coupon = require('../models/couponModel');

// Create a new coupon
exports.createCoupon = async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all coupons with pagination
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find(); // Retrieve all coupons
    res.json({ total: coupons.length, coupons }); // Return total count and coupons
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a coupon by ID
exports.updateCoupon = async (req, res) => {
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCoupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json(updatedCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a coupon by ID
exports.deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
