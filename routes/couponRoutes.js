// routes/couponRoutes.js
const express = require('express');
const { createCoupon, getCoupons, updateCoupon, deleteCoupon } = require('../controllers/couponController');

const router = express.Router();

// POST /api/coupons - Create a new coupon
router.post('/', createCoupon);

// GET /api/coupons - Get all coupons with pagination
router.get('/', getCoupons);

// PATCH /api/coupons/:id - Update a coupon by ID
router.patch('/:id', updateCoupon);

// DELETE /api/coupons/:id - Delete a coupon by ID
router.delete('/:id', deleteCoupon);

module.exports = router;
