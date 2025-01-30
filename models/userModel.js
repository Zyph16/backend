// models/userModel.js
const db = require('../config/db'); // Adjust path as needed

// Get user by username
const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// Create user in the database
const createUser = (username, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) reject(err);
      resolve({
        user_id: result.insertId,
        username: username
      });
    });
  });
};
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT user_id, username FROM users", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser
};
