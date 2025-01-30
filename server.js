const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const { errorHandler } = require('./middlewares/errorHandler');  // Custom error handler

dotenv.config();

const app = express();

// CORS configuration - allow specific origins
const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];
app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

// Body parser middleware
app.use(bodyParser.json());

// Routes for different resources
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/grades', gradeRoutes);

// Example routes for checking user ID and username
app.post('/api/users/check-userid', async (req, res) => {
  const { user_id } = req.body;
  try {
    const user = await User.findOne({ user_id });
    if (user) {
      return res.status(400).json({ error: 'User ID already exists' });
    }
    res.status(200).json({ message: 'User ID is available' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while checking user ID' });
  }
});

app.post('/api/users/check-username', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    res.status(200).json({ message: 'Username is available' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while checking username' });
  }
});

// Global error handler middleware
app.use(errorHandler);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
