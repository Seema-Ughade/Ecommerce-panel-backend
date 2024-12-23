const express = require('express')
const router = express.Router()
const { registerVendor, loginVendor } = require('../controllers/VendorController')

router.post('/vendor/register', registerVendor)
router.post('/vendor/login', loginVendor)

module.exports = router

