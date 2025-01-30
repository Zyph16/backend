const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);

router.post('/check-username', async (req, res) => {
    const { username } = req.body;
    try {
      const isTaken = await User.checkUsernameAvailability(username);
      if (isTaken) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      res.status(200).json({ message: 'Username is available' });
    } catch (err) {
      res.status(500).json({ error: 'Server error while checking username' });
    }
  });
  

  router.post('/check-userid', async (req, res) => {
    const { user_id } = req.body;
    try {
      const isTaken = await User.checkUserIdAvailability(user_id);
      if (isTaken) {
        return res.status(400).json({ error: 'User ID already exists' });
      }
      res.status(200).json({ message: 'User ID is available' });
    } catch (err) {
      res.status(500).json({ error: 'Server error while checking user ID' });
    }
  });


module.exports = router;
