
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports.signin = (req, res) => {
  const { username, password } = req.body;

  User.getByUsername(username, (err, userResult) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!userResult || userResult.length === 0) return res.status(404).json({ error: "User not found" });

    const user = userResult[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: "Error comparing passwords" });
      if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { user_id: user.user_id, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        user: { id: user.user_id, username: user.username },
        token,
      });
    });
  });
};
