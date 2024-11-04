// models/Role.js
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: Map,
    of: Boolean,
    default: {},
  },
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
