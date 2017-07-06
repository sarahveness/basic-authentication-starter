var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});

router.post('/register', function(req, res, next) {

  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  // Additional validation to ensure username is alphanumeric with underscores and dashes
  req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);


  const errors = req.validationErrors();
  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);
    res.render('register', {
      title: 'Registration Error',
      errors: errors
    });
  } else {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      const db = require('../db.js');
      db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], function(error, results, fields) {
        if (error) throw error;

        res.render('register', { title: 'Registration Complete' });
      })
    }

});

module.exports = router;
