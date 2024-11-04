
const { fileUploadController } = require('../controllers/fileController');

const express = require('express');
const router = express.Router();
const { upload } = require('../config/fileLocationConfig');
const { isAuthenticated } = require('../middleware/authMiddleware');



router.post('/upload', isAuthenticated, upload.single("file"), fileUploadController);


module.exports = router;