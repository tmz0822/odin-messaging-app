const User = require('../models/User');

const getUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const user = await User.findUserById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAllUsers();

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No users found' });
    }

    res.json({ success: true, users });
  } catch (error) {
    console.error('Error getting all users: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  getUser,
  getAllUsers,
};
