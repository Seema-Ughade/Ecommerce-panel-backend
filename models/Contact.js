const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    trim: true,
    lowercase: true
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);

