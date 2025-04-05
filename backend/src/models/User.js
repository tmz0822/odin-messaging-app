const prisma = require('../config/prisma');

const userOmitFields = {
  password: true,
  role: true,
};

const findUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      omit: userOmitFields,
    });

    return user;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw new Error('Database query failed');
  }
};

// Used to verify the user when the user logins.
const findUserByUsername = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true, // Used to generate token
        password: true, // Used to verify with the hashed password
      },
    });

    return user;
  } catch (error) {
    console.error('Error finding user by username:', error);
    throw new Error('Database query failed');
  }
};

const findAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    });

    return users;
  } catch (error) {
    console.error('Error finding all users:', error);
    throw new Error('Database query failed');
  }
};

const createUser = async (username, password) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Database query failed');
  }
};

const updateAvatar = async (userId, avatarPath) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        avatar: avatarPath,
      },
      omit: userOmitFields,
    });

    return updatedUser;
  } catch (error) {
    console.error('Error updating avatar: ', error);
    throw new Error('Database query failed');
  }
};

const updateUser = async (userId, updates) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updates,
      omit: userOmitFields,
    });

    return updatedUser;
  } catch (error) {
    console.error('Error updating user: ', error);
    throw new Error('Failed to update user');
  }
};

module.exports = {
  findUserById,
  findUserByUsername,
  findAllUsers,
  createUser,
  updateAvatar,
  updateUser,
};
