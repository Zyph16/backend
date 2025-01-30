
const Subject = require('../models/subjectModel');

module.exports = {

  createSubject: (req, res) => {
    const { subject_code, subject_name, schedule_time, year, semester, home_college, home_department } = req.body;
    Subject.createSubject(subject_code, subject_name, schedule_time, year, semester, home_college, home_department, (err, result) => {
      if (err) return res.status(500).json({ error: "Error adding subject" });
      res.status(201).json({ message: "Subject added successfully" });
    });
  },


  getAllSubjects: (req, res) => {
    Subject.getAllSubjects((err, subjects) => {
      if (err) return res.status(500).json({ error: "Error fetching subjects" });
      res.status(200).json(subjects);
    });
  },


  getSubjectById: (req, res) => {
    const { subject_id } = req.params;
    Subject.getSubjectById(subject_id, (err, subject) => {
      if (err) return res.status(500).json({ error: "Error fetching subject" });
      if (!subject) return res.status(404).json({ error: "Subject not found" });
      res.status(200).json(subject);
    });
  },


  updateSubject: (req, res) => {
    const { subject_id } = req.params;
    const { subject_code, subject_name, schedule_time, year, semester, home_college, home_department } = req.body;
    Subject.updateSubject(subject_id, subject_code, subject_name, schedule_time, year, semester, home_college, home_department, (err, result) => {
      if (err) return res.status(500).json({ error: "Error updating subject" });
      res.status(200).json({ message: "Subject updated successfully" });
    });
  },


  deleteSubject: (req, res) => {
    const { subject_id } = req.params;
    Subject.deleteSubject(subject_id, (err, result) => {
      if (err) return res.status(500).json({ error: "Error deleting subject" });
      res.status(200).json({ message: "Subject deleted successfully" });
    });
  }
};
