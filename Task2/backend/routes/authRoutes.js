const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash });
  await user.save();
  res.send({ message: "User registered" });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.send({ message: "Login successful" });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});
// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'All fields are required' });
  
    try {
      const userExists = await User.findOne({ username });
      if (userExists) return res.status(400).json({ message: 'Username already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User created' });
    } catch (err) {
      res.status(500).json({ message: 'Error creating user' });
    }
  });
  
module.exports = router;
