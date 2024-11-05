const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },

});

module.exports = mongoose.model('State', StateSchema);
