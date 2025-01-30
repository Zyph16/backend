const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const { errorHandler } = require('./middlewares/errorHandler'); 

dotenv.config();

const app = express();

// Use environment variables for allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',  // Local development frontend URL or default
  process.env.FRONTEND_DEPLOYED_URL || 'https://uep-student-portal-bwfv96dw0-zyph16s-projects.vercel.app', // Deployed frontend URL
];

app.use(cors({
  origin: allowedOrigins, 
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, 
}));

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/grades', gradeRoutes);

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

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
