// routes/authRoutes.jsconst express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signin', authController.signin);

module.exports = router;
