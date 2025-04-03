const prisma = require('../config/prisma');

const findUserByUsername = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return user;
  } catch (error) {
    console.error('Error finding user by username:', error);
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

module.exports = { findUserByUsername, createUser };
