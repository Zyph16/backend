const db = require('../config/db'); // Adjust path as needed

// Create student in the database
const createStudent = (user_id, first_name, last_name, birthdate, email, phone, address) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO students (person_id, user_id, first_name, last_name, date_of_birth, email, phone, address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [user_id, user_id, first_name, last_name, birthdate, email, phone, address], (err, result) => {
      if (err) reject(err);
      resolve({
        person_id: result.insertId,  // person_id is now the same as user_id
        first_name,
        last_name,
        birthdate,
        email,
      });
    });
  });
};

// Get student by user_id
const getStudentByUserId = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM student WHERE user_id = ?';
    db.query(query, [user_id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// Get student by person_id (for retrieval based on person_id)
const getStudentByPersonId = (person_id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM student WHERE person_id = ?';
    db.query(query, [person_id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// Export the functions to be used in other parts of the app
module.exports = {
  createStudent,
  getStudentByUserId,
  getStudentByPersonId,
};
