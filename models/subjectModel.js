// models/subjectModel.js
const db = require('../config/db');

module.exports = {
  // Create Subject
  createSubject: (subject_code, subject_name, schedule_time, year, semester, home_college, home_department, callback) => {
    const query = 'INSERT INTO subject (subject_code, subject_name, schedule_time, year, semester, home_college, home_department) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [subject_code, subject_name, schedule_time, year, semester, home_college, home_department], callback);
  },

  // Read All Subjects
  getAllSubjects: (callback) => {
    const query = 'SELECT * FROM subject';
    db.query(query, callback);
  },

  // Read Subject by ID
  getSubjectById: (subject_id, callback) => {
    const query = 'SELECT * FROM subject WHERE subject_id = ?';
    db.query(query, [subject_id], callback);
  },

  // Update Subject Information
  updateSubject: (subject_id, subject_code, subject_name, schedule_time, year, semester, home_college, home_department, callback) => {
    const query = `UPDATE subject SET subject_code = ?, subject_name = ?, schedule_time = ?, year = ?, semester = ?, home_college = ?, home_department = ? WHERE subject_id = ?`;
    db.query(query, [subject_code, subject_name, schedule_time, year, semester, home_college, home_department, subject_id], callback);
  },

  // Delete Subject
  deleteSubject: (subject_id, callback) => {
    const query = 'DELETE FROM subject WHERE subject_id = ?';
    db.query(query, [subject_id], callback);
  }
};
