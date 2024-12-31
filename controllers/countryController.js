const Country = require('../models/Country');

exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCountry = async (req, res) => {
  const country = new Country({
    name: req.body.name,
    tax: req.body.tax,
    allowStateTax: req.body.allowStateTax,
    states: req.body.states
  });

  try {
    const newCountry = await country.save();
    res.status(201).json(newCountry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    country.name = req.body.name;
    country.tax = req.body.tax;
    country.allowStateTax = req.body.allowStateTax;
    country.states = req.body.states;

    const updatedCountry = await country.save();
    res.json(updatedCountry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    await country.remove();
    res.json({ message: 'Country deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

