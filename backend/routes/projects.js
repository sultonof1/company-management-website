const express = require('express');
const router = express.Router();
const multer = require('multer');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');
const upload = multer({ dest: 'uploads/' });

router.get('/projects', projectController.getProjects);
router.post('/projects', authMiddleware, upload.array('images', 10), projectController.createProject);
router.put('/projects/:id', authMiddleware, upload.array('images', 10), projectController.updateProject);
router.delete('/projects/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
