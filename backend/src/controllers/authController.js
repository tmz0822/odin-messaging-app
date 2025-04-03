const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function signup(req, res) {
  const { username, password } = req.body;

  try {
    // Check if user exists in db
    const existingUser = await User.findUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in db
    const newUser = await User.createUser(username, hashedPassword);

    if (!newUser) {
      return res.status(500).json({ message: 'Failed to create user' });
    }

    // Send success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

function login(req, res) {
  const { username, password } = req.body;

  try {
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { signup, login };
