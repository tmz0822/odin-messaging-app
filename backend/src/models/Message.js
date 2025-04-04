const prisma = require('../config/prisma');

const addMessage = async (message) => {
  const { senderId, receiverId, content } = message;

  try {
    const newMessage = await prisma.message.create({
      data: {
        content: content,
        sender: { connect: { id: senderId } },
        receiver: { connect: { id: receiverId } },
      },
    });

    return newMessage;
  } catch (error) {
    console.error('Error adding message:', error);
    throw new Error('Failed to add message');
  }
};

const getMessages = async (userId, receiverId) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }
};

module.exports = { addMessage, getMessages };
