
const Student = require('../models/studentModel');

module.exports = {

  createStudent: (req, res) => {
    const { person_id, first_name, last_name, user_id } = req.body;
    Student.createStudent(person_id, first_name, last_name, user_id, (err, result) => {
      if (err) return res.status(500).json({ error: "Error adding student" });
      res.status(201).json({ message: "Student added successfully" });
    });
  },

  getAllStudents: (req, res) => {
    Student.getAllStudents((err, students) => {
      if (err) return res.status(500).json({ error: "Error fetching students" });
      res.status(200).json(students);
    });
  },


  getStudentById: (req, res) => {
    const { person_id } = req.params;
    Student.getStudentById(person_id, (err, student) => {
      if (err) return res.status(500).json({ error: "Error fetching student" });
      if (!student) return res.status(404).json({ error: "Student not found" });
      res.status(200).json(student);
    });
  },


  updateStudent: (req, res) => {
    const { person_id } = req.params;
    const { first_name, last_name, email, phone, address } = req.body;
    Student.updateStudent(person_id, first_name, last_name, email, phone, address, (err, result) => {
      if (err) return res.status(500).json({ error: "Error updating student" });
      res.status(200).json({ message: "Student updated successfully" });
    });
  },


  deleteStudent: (req, res) => {
    const { person_id } = req.params;
    Student.deleteStudent(person_id, (err, result) => {
      if (err) return res.status(500).json({ error: "Error deleting student" });
      res.status(200).json({ message: "Student deleted successfully" });
    });
  }
};
