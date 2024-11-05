// routes/cityRoutes.js
const express = require('express');
const {
  getCities,
  createCity,
  updateCity,
  deleteCity,
  updateCityStatus
} = require('../controllers/cityController');

const router = express.Router();

router.get('/cities', getCities); // GET all cities
router.post('/cities', createCity); // POST new city
router.put('/cities/:id', updateCity); // PUT (update) a city by ID
router.delete('/cities/:id', deleteCity); // DELETE a city by ID
// Route for updating city status
router.put('/cities/:id/status', updateCityStatus);

module.exports = router;
