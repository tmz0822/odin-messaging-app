const { Router } = require('express');
const { authenticate } = require('../middlewares/authMiddleware');

const messagesRouter = Router();
const messagesController = require('../controllers/messagesController');

messagesRouter.use(authenticate);

messagesRouter.post('/', messagesController.sendMessage);

messagesRouter.get('/:receiverId', messagesController.getMessages);

module.exports = messagesRouter;
