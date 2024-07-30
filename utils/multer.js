const { extname } = require('path');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // Adjust the path as needed

// Configure Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => extname(file.originalname).substring(1), // Get file extension without the dot
    public_id: (req, file) => Date.now() + '_' + file.originalname.replace(/\s+/g, '_'), // Unique identifier
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
