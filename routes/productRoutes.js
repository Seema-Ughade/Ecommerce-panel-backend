const express = require('express');
const { createProduct } = require('../controllers/productController');
const multer = require('multer');
const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
  },
});

const upload = multer({ storage });

// Define routes
router.post('/', upload.fields([{ name: 'featureImage' }, { name: 'galleryImages' }]), createProduct);

module.exports = router;
