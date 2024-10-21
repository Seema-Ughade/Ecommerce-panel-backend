//Singleimage multer

const multer = require('multer');

// Use memory storage for uploading files
const storage = multer.memoryStorage();

const singleUpload = multer({ storage }).single('featureImage'); // Ensure this matches your field name

// Export singleUpload using CommonJS syntax
module.exports = singleUpload;

