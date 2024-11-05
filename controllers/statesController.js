const State = require('../models/State');

// Get all states
exports.getStates = async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching states' });
  }
};

// Create a new state
exports.createState = async (req, res) => {
  const { country, state, tax } = req.body;
  const newState = new State({ country, state, tax });

  try {
    const savedState = await newState.save();
    res.status(201).json(savedState);
  } catch (error) {
    res.status(400).json({ message: 'Error creating state' });
  }
};

// Update a state
exports.updateState = async (req, res) => {
  const { id } = req.params;
  const updatedState = req.body;

  try {
    const state = await State.findByIdAndUpdate(id, updatedState, { new: true });
    res.status(200).json(state);
  } catch (error) {
    res.status(400).json({ message: 'Error updating state' });
  }
};

// Delete a state
exports.deleteState = async (req, res) => {
  const { id } = req.params;

  try {
    await State.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting state' });
  }
};

// Controller function for updating state status
exports.updateStateStatus = async (req, res) => {
    const { status } = req.body;
    try {
      const updatedState = await State.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!updatedState) {
        return res.status(404).json({ message: 'State not found' });
      }
      res.json(updatedState);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  