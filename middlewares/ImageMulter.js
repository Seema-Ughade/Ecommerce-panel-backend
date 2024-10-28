// middlewares/multer.js
const multer = require('multer');

// Use memory storage for uploading files
const storage = multer.memoryStorage();

// Set up multer to accept single image uploads, ensure the field name matches your frontend
const singleUpload = multer({ storage }).single('image'); // Change 'image' to match the field name in your form

// Export singleUpload using CommonJS syntax
module.exports = singleUpload;
