const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.jwt]), // Extract token from cookies
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findUserById(jwtPayload.id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

module.exports = passport;
