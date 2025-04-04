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
      include: {
        sender: {
          select: {
            avatar: true,
            username: true,
          },
        },
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
      include: {
        sender: {
          select: {
            avatar: true,
            username: true,
          },
        },
        receiver: {
          select: {
            avatar: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // returns descending because the frontend is using a flex-direction: column-reverse trick
      },
    });

    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }
};

module.exports = { addMessage, getMessages };
