
const db = require('../config/db'); 


const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};


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

const checkUsernameAvailability = (username) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
      if (err) reject(err);
      resolve(result.length > 0); 
    });
  });
};


const checkUserIdAvailability = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE user_id = ?';
    db.query(query, [user_id], (err, result) => {
      if (err) reject(err);
      resolve(result.length > 0); 
    });
  });
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  checkUsernameAvailability,
  checkUserIdAvailability
};
