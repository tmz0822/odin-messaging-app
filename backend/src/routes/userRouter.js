const { Router } = require('express');

const userRouter = Router();

const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

userRouter.use(authenticate);

userRouter.get('/me', userController.getUser);
userRouter.get('/', userController.getAllUsers);
userRouter.post('/avatar', userController.uploadAvatar);

module.exports = userRouter;
