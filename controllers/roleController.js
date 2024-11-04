// controllers/roleController.js
const Role = require('../models/Role');

// Get all roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new role
const createRole = async (req, res) => {
  const { name, permissions } = req.body;
  const role = new Role({ name, permissions });

  try {
    const newRole = await role.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a role
const updateRole = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRole = await Role.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    await Role.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
};
