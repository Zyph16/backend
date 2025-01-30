// routes/gradeRoutes.js
const express = require('express');
const gradeController = require('../controllers/gradeController');
const router = express.Router();

router.post('/grade', gradeController.createGrade);
router.get('/grades/:person_id', gradeController.getGradesByStudent);
router.put('/grade/:grade_id', gradeController.updateGrade);
router.delete('/grade/:grade_id', gradeController.deleteGrade);

module.exports = router;
