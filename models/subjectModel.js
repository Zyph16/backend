
const db = require('../config/db');

module.exports = {

  createSubject: (subject_code, subject_name, schedule_time, year, semester, home_college, home_department, callback) => {
    const query = 'INSERT INTO subject (subject_code, subject_name, schedule_time, year, semester, home_college, home_department) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [subject_code, subject_name, schedule_time, year, semester, home_college, home_department], callback);
  },


  getAllSubjects: (callback) => {
    const query = 'SELECT * FROM subject';
    db.query(query, callback);
  },


  getSubjectById: (subject_id, callback) => {
    const query = 'SELECT * FROM subject WHERE subject_id = ?';
    db.query(query, [subject_id], callback);
  },


  updateSubject: (subject_id, subject_code, subject_name, schedule_time, year, semester, home_college, home_department, callback) => {
    const query = `UPDATE subject SET subject_code = ?, subject_name = ?, schedule_time = ?, year = ?, semester = ?, home_college = ?, home_department = ? WHERE subject_id = ?`;
    db.query(query, [subject_code, subject_name, schedule_time, year, semester, home_college, home_department, subject_id], callback);
  },


  deleteSubject: (subject_id, callback) => {
    const query = 'DELETE FROM subject WHERE subject_id = ?';
    db.query(query, [subject_id], callback);
  }
};
