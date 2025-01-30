
const express = require('express');
const subjectController = require('../controllers/subjectController');
const router = express.Router();

router.post('/subject', subjectController.createSubject);

module.exports = router;
