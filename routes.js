// Require passport for authentication
const passport = require('passport');

// Require bcrypt for password hashing
const bcrypt = require('bcryptjs');

// Require path for path joining
const path = require('path');

// Require User model
const User = require('./schemas/User');

// Export routes module
module.exports = (app) => {
  // GET requests handler, for /
  app.route('/').get((req, res) => {
    // Redirect to /login
    res.redirect('/login');
  });

  /**
   * TODO: Implement below two handlers
   */
  // GET requests handler, for /home
  app.route('/home').get((req, res) => {
    // Check if user is logged in
    if (req.isAuthenticated())
      // TODO: User is logged in, render home page
      res.send('Home page. <a href="/logout">Log Out.</a><br>' + req.user);
    // User is not logged in, render login form with alert
    else
      res.render('form', {
        type: 'login',
        alertMessage: 'Log in to continue.',
        alertType: 'danger'
      });
  });

  // GET requests handler, for /profile
  app.route('/profile').get((req, res) => {
    // Check if user is logged in
    if (req.isAuthenticated())
      // TODO: User is logged in, render profile page
      res.send('Profile page. <a href="/logout">Log Out.</a><br>' + req.user);
    // User is not logged in, render login form with alert
    else
      res.render('form', {
        type: 'login',
        alertMessage: 'Log in to continue.',
        alertType: 'danger'
      });
  });

  // GET and POST requests handler, for /login
  app
    .route('/login')
    .get((req, res) => {
      // Check if user is logged in
      if (req.isAuthenticated())
        // User is logged in, redirect to /home
        res.redirect('/home');
      // User is not logged in, render login form
      else res.render('form', { type: 'login', alertMessage: null });
    })
    .post(
      // Authenticate user with LocalStrategy
      passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/loginfail'
      })
    );

  // GET requests handler, for /loginfail
  app.route('/loginfail').get((req, res) => {
    // Check if user is logged in
    if (req.isAuthenticated())
      // User is logged in, redirect to /home
      res.redirect('/home');
    // User is not logged in, render login form with alert
    else
      res.render('form', {
        type: 'login',
        alertMessage: 'Invalid username or password.',
        alertType: 'danger'
      });
  });

  // GET and POST requests handler, for /register
  app
    .route('/register')
    .get((req, res) => {
      // Check if user is logged in
      if (req.isAuthenticated())
        // User is logged in, redirect to /home
        res.redirect('/home');
      // User is not logged in, render register form
      else res.render('form', { type: 'register', alertMessage: null });
    })
    .post((req, res) => {
      // Find if user is already registered
      User.findOne({ username: req.body.username }, (err, user) => {
        // If error, render register form with alert
        if (err)
          res.render('form', {
            type: 'register',
            alertMessage: 'An error occured.',
            alertType: 'danger'
          });
        // If user is already registered, render register form with alert
        else if (user)
          res.render('form', {
            type: 'register',
            alertMessage: 'User already exists.',
            alertType: 'danger'
          });
        // Else, proceed with registration
        else {
          // Convert password into its hash
          const hashedPassword = bcrypt.hashSync(req.body.password, 8);

          // Prepare user object
          const user = {
            username: req.body.username,
            password: hashedPassword,
            consent: req.body.consent ? true : false
          };

          // Save new user into database
          User.create(user, (err, user) => {
            // If error, render register form with alert
            if (err)
              res.render('form', {
                type: 'register',
                alertMessage: 'An error occured.',
                alertType: 'danger'
              });
            // Registration successful, render login form with alert
            else
              res.render('form', {
                type: 'login',
                alertMessage: 'Registration successful.',
                alertType: 'success'
              });
          });
        }
      });
    });

  // GET requests handler, for /logout
  app.route('/logout').get((req, res) => {
    // Log user out
    req.logout();

    // Redirect to login page
    res.redirect('/login');
  });

  // 404 handler
  app.use((req, res) => {
    // Send 404.html
    res.sendFile(path.join(__dirname, 'views/404.html'));
  });
};
