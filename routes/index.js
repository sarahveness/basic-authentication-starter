var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});

router.post('/register', function(req, res, next) {

  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4 - 15 characters long.').len(4, 15);
  req.checkBody('email', 'The email that you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4 - 100 characters long, please try again.').len(4, 100);
  req.checkBody('password', 'Password must be between 8 - 100 characters long.').len(8, 100);
  req.checkBody('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('reEnterPassword', 'Password must be between 8 - 100 characters long.').len(8, 100);
  req.checkBody('reEnterPassword', 'Passwords do not match, please try again.').equals(password);

  const errors = req.validationErrors();
  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);
    res.render('register', {title: 'Registration Error'});
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const db = require('../db.js');
  db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], function(error, results, fields) {
    if (error) throw error;

    res.render('register', { title: 'Registration Complete' });
  })
});

module.exports = router;
