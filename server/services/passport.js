const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET_KEY,
} = require('../config/keys');

const User = require('../models/user.model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile id
          done(null, existingUser);
        } else {
          // we don't have a record with the given profile id
          new User({ googleId: profile.id })
            .save()
            .then(newUser => done(null, newUser));
        }
      });
    }
  )
);
