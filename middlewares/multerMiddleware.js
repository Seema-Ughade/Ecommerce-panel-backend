const multer = require('multer');

// Use memory storage for uploading files
const storage = multer.memoryStorage();

// Set up multer to accept one file for the feature image and multiple files for the gallery images
const upload = multer({ storage });

// Export the upload middleware
module.exports = upload;
