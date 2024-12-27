const express = require('express');
const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

const router = express.Router();

// CRUD Routes for Contact
router.post('/contacts', createContact); // Create
router.get('/contacts', getContacts); // Read All
router.get('/contacts/:id', getContactById); // Read One
router.put('/contacts/:id', updateContact); // Update
router.delete('/contacts/:id', deleteContact); // Delete

module.exports = router;
