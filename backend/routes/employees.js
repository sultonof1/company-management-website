const express = require('express');
const router = express.Router();
const multer = require('multer');
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/auth');
const upload = multer({ dest: 'uploads/' });

router.get('/employees', employeeController.getEmployees);
router.post('/employees', authMiddleware, upload.single('image'), employeeController.createEmployee);
router.put('/employees/:id', authMiddleware, upload.single('image'), employeeController.updateEmployee);
router.delete('/employees/:id', authMiddleware, employeeController.deleteEmployee);

module.exports = router;
