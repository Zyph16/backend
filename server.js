const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const User = require('./models/User'); // Import the User model

dotenv.config();

const app = express();

// Define allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3001', 
  'http://localhost:3000', 
  'https://uep-student-portal.vercel.app' // Ensure this is listed correctly
];

app.use(cors({
  origin: function (origin, callback) {
    // Check if the incoming origin matches one of the allowed origins
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

// Body parsing middleware
app.use(bodyParser.json());

// Routes for users, students, subjects, and grades
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/grades', gradeRoutes);

// Check if the user_id exists
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

// Check if the username exists
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

// Register a new user
app.post('/api/users/register', async (req, res) => {
  const { username, password, user_id } = req.body;
  
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = new User({
      username,
      password,  // Ensure password is hashed before saving (you should handle this using bcrypt)
      user_id,
    });

    await newUser.save();

    res.status(201).json({ message: 'User successfully registered' });
  } catch (err) {
    res.status(500).json({ error: 'Error while registering user' });
  }
});

// Use error handler middleware
app.use(errorHandler);

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Server listening on the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
