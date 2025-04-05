const { Router } = require('express');

const authRouter = Router();

const authController = require('../controllers/authController');

const { validate, authenticate } = require('../middlewares/authMiddleware');
const { signupSchema, loginSchema } = require('../validations/authValidation');

authRouter.post('/signup', validate(signupSchema), authController.signup);
authRouter.post('/login', validate(loginSchema), authController.login);
authRouter.post('/logout', authenticate, authController.logout);

module.exports = authRouter;
