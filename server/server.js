const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/user.model');
require('./services/passport');

const { MONGO_URL, COOKIE_KEY } = require('./config/keys');

const authRoutes = require('./routes/authRoutes');

mongoose.connection.once('open', () => {
  console.log('MongoDB Connection Ready...');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

mongoose.connect(MONGO_URL);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

authRoutes(app);

app.listen(PORT);
