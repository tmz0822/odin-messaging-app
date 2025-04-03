const { Router } = require('express');

const authRouter = Router();

const authController = require('../controllers/authController');

const validate = require('../middlewares/validateAuth');
const { signupSchema } = require('../validations/authValidation');

authRouter.post('/signup', validate(signupSchema), authController.signup);
authRouter.post('/login', authController.login);

module.exports = authRouter;
