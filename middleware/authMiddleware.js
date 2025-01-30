// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Secret key from env
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token." });
  }
};
