const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Get all users
router.get('/', userController.getAllUsers);

// Check if user ID exists
router.post('/check-userid', userController.checkUserIdExists);

module.exports = router;
