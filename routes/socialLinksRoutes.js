const express = require('express');
const router = express.Router();
const socialLinkController = require('../controllers/socialLinkController');

// Define the routes
router.get('/', socialLinkController.getSocialLinks);
router.post('/', socialLinkController.createSocialLink);
router.put('/:id', socialLinkController.updateSocialLink);
router.delete('/:id', socialLinkController.deleteSocialLink);
router.put('/:id/status', socialLinkController.updateSocialStatus);

module.exports = router;
