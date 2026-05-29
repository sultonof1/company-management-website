const express = require('express');
const router = express.Router();
const multer = require('multer');
const aboutController = require('../controllers/aboutController');
const authMiddleware = require('../middleware/auth');
const upload = multer({ dest: 'uploads/' });

router.get('/about', aboutController.getAbout);
router.put('/about', authMiddleware, upload.array('images', 10), aboutController.updateAbout);
router.delete('/about/image', authMiddleware, aboutController.deleteImage);

module.exports = router;
