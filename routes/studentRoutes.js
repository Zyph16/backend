
const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

router.post('/student', studentController.createStudent);
router.get('/students', studentController.getAllStudents);
router.get('/student/:person_id', studentController.getStudentById);
router.put('/student/:person_id', studentController.updateStudent);
router.delete('/student/:person_id', studentController.deleteStudent);

module.exports = router;
