const multer = require('multer');

// Use memory storage for uploading files
const storage = multer.memoryStorage();

// Set up multer to accept multiple files
const upload = multer({ storage }).fields([
    { name: 'featureImage', maxCount: 1 }, // Expecting a single file for featureImage
    { name: 'galleryImages', maxCount: 10 } // Expecting multiple files for galleryImages
]);

// Export the upload middleware
module.exports = upload;
