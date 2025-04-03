const { Router } = require('express');

const userRouter = Router();

const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

userRouter.get('/me', authenticate, userController.getUser);

module.exports = userRouter;
