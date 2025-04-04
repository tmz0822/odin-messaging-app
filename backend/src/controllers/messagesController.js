const Message = require('../models/Message');
const User = require('../models/User');

const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;

  try {
    // Check if the receiver exists
    const receiver = await User.findUserById(receiverId);

    if (!receiver) {
      return res
        .status(404)
        .json({ success: false, message: 'Receiver not found' });
    }

    const newMessage = await Message.addMessage({
      senderId: req.user.id,
      receiverId,
      content,
    });

    return res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getMessages = async (req, res) => {
  const { receiverId } = req.params;

  try {
    const messages = await Message.getMessages(req.user.id, receiverId);

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { sendMessage, getMessages };
