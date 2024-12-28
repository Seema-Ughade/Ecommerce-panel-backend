const Contact = require('../models/Contact');

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const { name, phone, email, comment } = req.body;

    const contact = new Contact({
      name,
      phone,
      email,
      comment
    });

    await contact.save();

    res.status(201).json({ message: 'Contact message sent successfully', contact });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ data: contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Get a single contact by ID
exports.getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ data: contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Update a contact by ID
exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, comment } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, phone, email, comment },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact updated successfully', data: updatedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
