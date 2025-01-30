const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, password } = req.body;  

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }

  try {
  
    const result = await User.getUserByUsername(username);
    if (result.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = await User.createUser(username, hashedPassword);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.user_id,
        username: newUser.username,
      }
    });
  } catch (err) {
    console.error("Error during user registration:", err);
    return res.status(500).json({ 
      error: "Error registering user",
      details: err.message || err
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {

    const result = await User.getUserByUsername(username);
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result[0];


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }


    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        username: user.username
      }
    });

  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ error: "Error during login", details: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers(); 
    return res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Error fetching users", details: err.message });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  loginUser
};
