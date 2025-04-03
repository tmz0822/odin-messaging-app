const passport = require('../config/passport');

// Function to validate the request body against a Joi schema
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    next();
  };
};

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = { validate, authenticate };
