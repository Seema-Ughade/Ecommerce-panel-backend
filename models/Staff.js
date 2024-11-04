const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }, // Assuming role is a separate model
  password: { type: String, required: true },
  profileImage: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Staff', StaffSchema);
