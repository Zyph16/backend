
const Grade = require('../models/gradeModel');

module.exports = {

  createGrade: (req, res) => {
    const { person_id, subject_id, grade, year, semester } = req.body;
    Grade.createGrade(person_id, subject_id, grade, year, semester, (err, result) => {
      if (err) return res.status(500).json({ error: "Error adding grade" });
      res.status(201).json({ message: "Grade added successfully" });
    });
  },


  getGradesByStudent: (req, res) => {
    const { person_id } = req.params;
    Grade.getGradesByStudent(person_id, (err, grades) => {
      if (err) return res.status(500).json({ error: "Error fetching grades" });
      res.status(200).json(grades);
    });
  },


  updateGrade: (req, res) => {
    const { grade_id } = req.params;
    const { grade, year, semester } = req.body;
    Grade.updateGrade(grade_id, grade, year, semester, (err, result) => {
      if (err) return res.status(500).json({ error: "Error updating grade" });
      res.status(200).json({ message: "Grade updated successfully" });
    });
  },


  deleteGrade: (req, res) => {
    const { grade_id } = req.params;
    Grade.deleteGrade(grade_id, (err, result) => {
      if (err) return res.status(500).json({ error: "Error deleting grade" });
      res.status(200).json({ message: "Grade deleted successfully" });
    });
  }
};
