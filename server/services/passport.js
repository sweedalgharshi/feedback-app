const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET_KEY,
} = require('../config/keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log('profile:', profile);
    }
  )
);
