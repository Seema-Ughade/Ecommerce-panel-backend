// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Assuming you have a Category model
    required: true,
  },
  featureImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
