const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const messagesRouter = require('./routes/messagesRouter');

const passport = require('./config/passport');

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport
// app.use(passport.initialize());

// Routers
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/messages', messagesRouter);

app.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: 'Protected route accessed!', user: req.user });
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Server is running on port ${process.env.PORT_NUMBER}`);
});
