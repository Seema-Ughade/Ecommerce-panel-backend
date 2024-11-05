const express = require('express');
const router = express.Router();
const statesController = require('../controllers/statesController');

// Routes for states
router.get('/', statesController.getStates);
router.post('/', statesController.createState);
router.put('/:id', statesController.updateState);
router.delete('/:id', statesController.deleteState);
router.put('/:id/status', statesController.updateStateStatus);

module.exports = router;
