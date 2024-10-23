// routes/postRoutes.js
const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const singleUpload = require('../middlewares/multer'); // Adjust path as necessary

const router = express.Router();

// Configure multer for file uploads

// Routes
router.post('/', singleUpload, createPost);
router.get('/' , getPosts);

module.exports = router;
