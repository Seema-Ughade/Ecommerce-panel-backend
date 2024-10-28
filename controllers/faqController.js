// controllers/faqController.js
const Faq = require('../models/Faq');

exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching FAQs' });
  }
};

exports.createFaq = async (req, res) => {
  const { title, description } = req.body;
  const newFaq = new Faq({ title, description });

  try {
    const savedFaq = await newFaq.save();
    res.status(201).json(savedFaq);
  } catch (error) {
    res.status(400).json({ message: 'Error creating FAQ' });
  }
};

exports.updateFaq = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedFaq = await Faq.findByIdAndUpdate(id, { title, description }, { new: true });
    res.json(updatedFaq);
  } catch (error) {
    res.status(400).json({ message: 'Error updating FAQ' });
  }
};

exports.deleteFaq = async (req, res) => {
  const { id } = req.params;

  try {
    await Faq.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting FAQ' });
  }
};
