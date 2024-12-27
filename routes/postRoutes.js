// routes/postRoutes.js
const express = require('express');
const { createPost, getPosts , getPostById , deletePost, updatePost} = require('../controllers/postController');
const singleUpload = require('../middlewares/multer'); // Adjust path as necessary

const router = express.Router();

// Configure multer for file uploads

// Routes
router.post('/', singleUpload, createPost);
router.get('/' , getPosts);
// Get a single post by ID

// Update a post
router.put('/:id', singleUpload, updatePost);
router.get('/:id', getPostById);

// Delete a post
router.delete('/:id', deletePost);

module.exports = router;


module.exports = router;
