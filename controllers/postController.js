// controllers/postController.js
const Post = require('../models/Post');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require("../utils/dataUri"); // Adjust the path to your utility file

// Create a new post
exports.createPost = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  try {
    // Destructure fields from the request body
    const { title, category, description, source, tags } = req.body;

    // Initialize variable for the image URL
    let featuredImageUrl = null;

    // Check if there is a file to upload
    if (req.file) {
      // Use getDataUri to convert the file to a data URI
      const fileUri = getDataUri(req.file).content;

      // Upload the file as a data URI to Cloudinary
      const result = await cloudinary.uploader.upload(fileUri, {
        resource_type: 'auto',
      });
      
      featuredImageUrl = result.secure_url; // Get the secure URL from the upload result
    }

    // Create a new post instance
    const newPost = new Post({
      title,
      category,
      featureImage: featuredImageUrl,  // Use the Cloudinary image URL if available
      description,
      source,
      tags: tags.split(','), // Split tags into an array
    });

    // Save the new post to the database
    const savedPost = await newPost.save();

    // Send a 201 Created response with the saved post data
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error.message); // Log detailed error message
    res.status(500).json({ message: 'Error creating post' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error.message);
    res.status(500).json({ message: 'Error fetching post', error });
  }
};

// Fetch all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('category'); // Populate category for full data
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error.message); // Log detailed error message
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};
exports.updatePost = async (req, res) => {
  try {
    const { title, category, description, source, tags } = req.body;
    let updateData = { title, category, description, source, tags: tags.split(',') };

    if (req.file) {
      const fileUri = getDataUri(req.file).content;
      const result = await cloudinary.uploader.upload(fileUri, {
        resource_type: 'auto',
      });
      updateData.featureImage = result.secure_url;
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};



module.exports = {
  createPost: exports.createPost,
  getPosts: exports.getPosts,
  updatePost: exports.updatePost,
  deletePost: exports.deletePost,
  getPostById: exports.getPostById,
};
