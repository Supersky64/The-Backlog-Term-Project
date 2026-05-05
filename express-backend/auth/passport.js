require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userModel = require('../models/userModel');


passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (token, tokenSecret, profile, done) => {

  const newUser = {
    googleId: profile.id,
    displayName: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    email: profile.emails[0].value
  }
  let user = await userModel.getUserByGoogleId(profile.id);

if (!user) {
  user = await userModel.createNewUser([
    profile.id,
    profile.displayName,
    profile.emails[0].value
  ]);
}

return done(null, user); 
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.getOneUserById(id); // Fetch from DB
    done(null, user); // Pass the full user object
  } catch (error) {
    done(error);
  }
});