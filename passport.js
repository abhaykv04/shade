// Require User model
const User = require('./schemas/User');

// Require express-session and passport for authentication
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Require bcryptjs for password hashing
const bcrypt = require('bcryptjs');

// Export passport module
module.exports = (app) => {
  // Initialise express- and passport session
  app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Function to serialise user
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Function to deserialise user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // Implement a passport LocalStrategy
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Try to find user in database
      User.findOne({ username: username }, (err, user) => {
        // Error in retrieving user
        if (err) return done(err);

        // Incorrect username
        if (!user) return done(null, false);

        // Incorrect password
        if (!bcrypt.compareSync(password, user.password))
          return done(null, false);

        // Correct username and password
        return done(null, user);
      });
    })
  );
};