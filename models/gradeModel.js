// models/gradeModel.js
const db = require('../config/db');

module.exports = {
  // Create Grade
  createGrade: (person_id, subject_id, grade, year, semester, callback) => {
    const query = 'INSERT INTO grades (person_id, subject_id, grade, year, semester) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [person_id, subject_id, grade, year, semester], callback);
  },

  // Read Grades by Student
  getGradesByStudent: (person_id, callback) => {
    const query = 'SELECT * FROM grades WHERE person_id = ?';
    db.query(query, [person_id], callback);
  },

  // Read Grade by ID
  getGradeById: (grade_id, callback) => {
    const query = 'SELECT * FROM grades WHERE grade_id = ?';
    db.query(query, [grade_id], callback);
  },

  // Update Grade Information
  updateGrade: (grade_id, grade, year, semester, callback) => {
    const query = `UPDATE grades SET grade = ?, year = ?, semester = ? WHERE grade_id = ?`;
    db.query(query, [grade, year, semester, grade_id], callback);
  },

  // Delete Grade
  deleteGrade: (grade_id, callback) => {
    const query = 'DELETE FROM grades WHERE grade_id = ?';
    db.query(query, [grade_id], callback);
  }
};
