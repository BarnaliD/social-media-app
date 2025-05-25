const express = require('express');
const router = express.Router();
const UserDatabase = require('../controllers/Userdatabase');
const UserManager = require('../controllers/UserManager');

const db = new UserDatabase();
const manager = new UserManager(db);

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  try {
    const user = manager.register(username, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  try {
    const user = manager.login(username, password);
    res.status(200).json({ message: 'Logged in', user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.post('/change-password', (req, res) => {
  const { newPassword } = req.body;
  try {
    manager.changePassword(newPassword);
    res.status(200).json({ message: 'Password changed' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
