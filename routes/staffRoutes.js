const express = require('express');
const { createStaff, getStaffs, updateStaff, deleteStaff } = require('../controllers/staffController');
const singleUpload = require('../middlewares/ImageMulter.js'); // Adjust path as necessary

const router = express.Router();

router.post('/', singleUpload, createStaff);
router.get('/', getStaffs);
router.put('/:id', singleUpload, updateStaff);
router.delete('/:id', deleteStaff);

module.exports = router;
