const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

async function signup(req, res) {
  const { username, password } = req.body;

  try {
    // Check if user exists in db
    const existingUser = await User.findUserByUsername(username);

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in db
    const newUser = await User.createUser(username, hashedPassword);

    if (!newUser) {
      return res
        .status(500)
        .json({ success: false, message: 'Failed to create user' });
    }

    // Send success response
    res
      .status(201)
      .json({ success: true, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findUserByUsername(username);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username or password' });
    }

    const token = generateToken(user);

    res.json({ success: true, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = { signup, login };
