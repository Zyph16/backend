const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Get all users
router.get('/', userController.getAllUsers); // Make sure this matches the route you're using to fetch users

module.exports = router;
