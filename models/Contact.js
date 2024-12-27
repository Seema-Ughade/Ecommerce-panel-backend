const mongoose = require('mongoose');


const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Email is not valid'],

    // Removed unique: true to allow multiple submissions from same email
  },
  comment: {
    type: String,
    required: true,
  }
}, { timestamps: true });


module.exports = mongoose.model('Contact', ContactSchema);
