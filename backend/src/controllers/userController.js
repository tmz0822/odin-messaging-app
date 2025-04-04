const User = require('../models/User');
const path = require('node:path');
const fs = require('fs');
const multer = require('multer');

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

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const allowedFields = ['bio'];

    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    const updatedUser = await User.updateUser(userId, updates);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to update profile' });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadAvatar = [
  upload.single('avatar'),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const avatarPath = `/uploads/${req.file.filename}`;

      const updatedUser = await User.updateAvatar(userId, avatarPath);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        message: 'Avatar uploaded successfully',
        avatar: avatarPath,
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to upload avatar' });
    }
  },
];

module.exports = {
  getUser,
  getAllUsers,
  uploadAvatar,
  updateProfile,
};
