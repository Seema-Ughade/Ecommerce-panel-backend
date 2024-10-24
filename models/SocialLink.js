const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], // Example statuses
    default: 'active',
  },

}, { timestamps: true });

const SocialLink = mongoose.model('SocialLink', socialLinkSchema);
module.exports = SocialLink;
